//=============================================================//
// ******************** ExportHAML ver.0.1 ******************* //
// ****************  Created by +Beans         *************** //
// *************     UR: plusbeans.com          ************** //
//=============================================================//

#target photoshop

main();

function main() {
    
    var lang = {
        en: 'en',
        ja: 'ja'
    };
    var messsage = {
        selectFolder: {
            en: 'Choose the folder to export the file.',
            ja: 'ファイルの書き出し先フォルダを選んでください'
        },
        exportError: {
            en: 'Error: Could not export files.',
            ja: 'エラー: ファイルの書き出しに失敗しました'
        },
        loadError: {
            en: 'Error: No such assets file or directory.',
            ja: 'エラー: アセットファイルの読み込みに失敗しました'
        },
        success: {
            en: 'Files to exported.',
            ja: 'ファイルの書き出しが完了しました'
        }
    }

    // Load header source for assets.
    var hamlHeader = getAssetSource('haml_header.txt');
    
    if (hamlHeader.length) { /* && _sass.length*/
        
        var f_path = Folder.selectDialog(localize(messsage.selectFolder));
        if (f_path == null) {
            return;
        }
        
        var appLang = localize(lang);
        var doc = app.activeDocument;
        var fileName = doc.name.split('.')[0];
        
        hamlHeader = hamlHeader.replace('$_LANG_', appLang);
        hamlHeader = hamlHeader.replace('$_CSS_FILE_PATH_', './css/'+fileName);
        hamlHeader = hamlHeader.replace('$_TITLE_', fileName);
        
        var souces = getSouceFromDocment(doc);
        souces[1] += closeSassBrackets(0, _previouseSassIndent);
        if (appLang == 'ja') {
            souces[1] = '@charset "utf-8";' + String.fromCharCode(13) + souces[1];
        }

        if (exportFile(hamlHeader + souces[0], fileName + '.haml', f_path) && 
            exportFile(souces[1], fileName + '.scss', f_path)) {
            alert(localize(messsage.success));
        } else {
            app.beep();
            alert(localize(messsage.exportError));
        }
    } else {
        app.beep();
        alert(localize(messsage.loadError));
    }
};

// Read asset file
function getAssetSource(fileName) {

    var currentFile = new File(assetsPath() + fileName);
        currentFile.encoding = 'UTF-8';

    if (currentFile.open('r')) {
        var source = currentFile.read();
        if (source !== '') {
            return source;
        };
    }
    return null;
}

function assetsPath() {
    var myfile = new File($.fileName);
    var folder = myfile.parent;
    var name = myfile.name;
    return folder.fsName + '/' + name.substr(0, name.lastIndexOf('.jsx')) + '.assets' + '/';
}

// Export file
function exportFile(sourceText, fileName, folderPath) {
    
    var file = new File(folderPath +'/'+ fileName);
    file.encoding = 'UTF-8';
    
    if (file.open('w')) {
        file.write(sourceText);
        return true;
    }
    return false;
}

// Get source of HTML & SASS
function getSouceFromDocment(doc) {
    
    var n = doc.layerSets.length;
    for (var i = 0; i < n; i++) {
        var group = doc.layerSets[i];
        if (group.name == "%body") {        // if groupLayer name is '%body', do scan.
            var tempArray = new Array(2);
            var CR = String.fromCharCode(13);
            tempArray[0] = tempArray[1] = CR;
            scanLayersToSource(group, 2, tempArray);
            return tempArray;
        }
    }
    return null;
}

var _previouseSassIndent = 0;

function scanLayersToSource(target, indent, outputs) {
    
    var targetLayers = target.layers;
    var limit = targetLayers.length;
    var CR = String.fromCharCode(13);
    var bracket = ' {' + CR;

    for (var i = 0; i < limit; i++) {

        var layer = targetLayers[i];
        var layerName = layer.name;
        
        if (layerName.indexOf('-') != 0) {
                        
            var hamlTab = indentTABs(indent);
            var sassIndent = (indent-2);
            var sassTab = indentTABs(sassIndent);
            
            outputs[1] += closeSassBrackets(sassIndent, _previouseSassIndent);
            
            if (layer.typename === "LayerSet") 
            {
                outputs[0] += hamlTab + layerName + CR;
                outputs[1] += sassTab + removeSymbol(layerName) + bracket;
                _previouseSassIndent = sassIndent;
                scanLayersToSource(layer, (indent+1), outputs);
            } 
            else                                        // layer is artLayer.
            {
                if(layer.kind == LayerKind.TEXT)    // layer is textLayer.
                {
                    var text = targetLayers[i].textItem.contents.replace(new RegExp(CR, 'g'), '#{"<br/>"}'); 
                    
                    if (layerName.indexOf('%') == -1)   // not tag.
                    {
                        outputs[0] += hamlTab + layerName + CR;
                    } 
                    else                                // has tag.(ex: h1, h2, p, span...etc.
                    {
                        var attr = '';
                        if (layerName.indexOf('%a') == 0) { 
                            attr = '{:href => "__URL__.html", :title => "__LINK_TITLE__"}'
                        }
                        outputs[0] += hamlTab + layerName + attr + ' ' + text + CR;
                        outputs[1] += sassTab + removeSymbol(layerName) + bracket;
                        _previouseSassIndent = sassIndent;
                    }
                    if (text.length > 15) {
                        text = text.substr(0, 15) + '...';
                    }
                    outputs[1] += sassTab + '/* ' + text + ' */' + CR;
                }
                else {                              // layer is not textLayer.
                    if (isImage(layerName))              // layer has extention of image.
                    {
                        outputs[0] += hamlTab + '%img{:src => "./images/'+ layerName +'", :alt => "__ALT__"}' + CR;
                        outputs[1] += sassTab + 'img' + bracket;
                        _previouseSassIndent = sassIndent;
                    }
                    else                                // layer is not textLayer.
                    {
                        outputs[0] += hamlTab + layerName + CR;
                        if (layerName.search(/%#./) == 0) {
                            outputs[1] += sassTab+removeSymbol(layerName) + bracket;
                        }
                    }
                    outputs[1] += sassTab + '/* ' + layerName + ' */' + CR;
                }                
            }
        }
    }
    return false;
}

function removeSymbol(layerName) {
    if (layerName.indexOf('%') == 0) {
        return layerName.substr(1, layerName.length-1);
    }
    return layerName;
}

function isImage(layerName) {
    var temp = layerName.split('.');
    var ext = temp[temp.length - 1];
    return (ext.length && (ext == 'jpg' || ext == 'png' || ext == 'gif' || ext == 'svg'));
}

function indentTABs(indent) {
    var tabs = "";
    var TAB = String.fromCharCode(9);
    
    for (var i = 0; i < indent; i++) {
        tabs = tabs + TAB;
    }
    return tabs;
}

function closeSassBrackets(currentIndent, lastIndent) {
    var brackets = '';
    var distance = lastIndent - currentIndent;
    if (distance >= 0) {
        var CR = String.fromCharCode(13);
        for (var j = lastIndent; j >= currentIndent; j--) {
            brackets += indentTABs(j) + '}' + CR;
        }
        _previouseSassIndent = currentIndent - distance;
    }
    return brackets;
}
