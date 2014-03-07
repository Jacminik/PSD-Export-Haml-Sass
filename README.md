MarkupExporter   ~ PSD Export Haml/ Sass ~
=====================

This script helps complete the markup in Photoshop for your web site easily.
You modify the layer structure of the PSD file and only carry out a script. MarkupExporter exports haml/sass file automatically.

![PSD and Pallette](https://dl.dropboxusercontent.com/u/15492792/github_resources/psd_and_palette.png)
![Up to compile](https://dl.dropboxusercontent.com/u/15492792/github_resources/psd_to_compile.png)
![Exported files](https://dl.dropboxusercontent.com/u/15492792/github_resources/exported_files.png)

# Installation

* Download and extract this project.
* Move `[+B]MarkupExporter.jsx` & `[+B]MarkupExporter.assets` folder  to your Photoshop scripts directory
	* Mac :		`/Applications/Adobe Photoshop CC/Presets/Scripts`
	* Windows:	`C:\Program Files\Adobe\Adobe Photoshop CC\Presets\Scripts`
* Restart Photoshop if it was already running

## How To Use:
### 1. Rename Layers & Layer Groups by the HAML Rule
Check out Haml site 
	-  [http://haml.info/](http:/haml.info/)
Check `sample.psd` included in this project. The layer structure in this file is made of Haml-style.

#### Make A Layer Group Named '%body'
At first gets to make a layer group named %body. The layer(s) outside '%body' layer group is excluded from an object of the processing.

![Add body group](https://dl.dropboxusercontent.com/u/15492792/github_resources/add_body.png)


#### About The Text Layer
`%p` and `%a` , `%h1`(etc..) are usable for the name of textLayer. The textLayer's text is handled automatically, do not include the textLayer's text on the layer name.
The line-break of the text is reflected.

![textlayer names](https://dl.dropboxusercontent.com/u/15492792/github_resources/textlayer.png)

#### About The Image (img tag)
When you want to treat the layer as an image, please rename it like 'logo.jpg' without adding "%~" or "%img" to the name of layer.
The layer that layer name ends in image extension(.jpg, .png, .gif, .svg) is treated as an image, and `src` and `alt` are added to a source automatically.
* This script can use Image Assets of Photoshop(Genarator) and [Slicy](http://macrabbit.com/slicy/) together.

![imagelayer names](https://dl.dropboxusercontent.com/u/15492792/github_resources/imagelayer.png)

#### Exclude From The Layer Of The Processing
When you have the layer that you want to exclude from processing, please attach "-" at the beginning of the name of the layer.

![exclude symbol](https://dl.dropboxusercontent.com/u/15492792/github_resources/exclude_symbol.png)

### 2. Run 'MarkupExporter' Script

* Access the script from the scripts menu in Photoshop: File > Scripts > [+B]MarkupExporter.
* Select the destination to save in a dialogue.


### 3. Edit the Haml file and the Sass File, and Compile.
Edit exported Haml file(.haml) and Sass file(.scss), and compile them using  [CodeKit](https://incident57.com/codekit/) or other.
(Checked the operation of MarkupExporter by CodeKit.)


# License

This Project is distributed under the terms and conditions of the MIT license.

* `sample.psd` is made with [WebZap](http://webzap.uiparade.com/) (by [UIParade](http://www.uiparade.com/)).
