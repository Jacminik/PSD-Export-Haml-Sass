ExportHAMLSASS ~PSD export Haml & Sass~
=====================

Create html/css files from your Photoshop file easily.
# Installation

* Download and extract this project.
* Move `[+B]ExportHAMLSASS.jsx` & `[+B]ExportHAMLSASS.assets` folder  to your Photoshop scripts directory
	* Mac : `/Applications/Adobe Photoshop CC/Presets/Scripts`
	* Windows:`C:\Program Files\Adobe\Adobe Photoshop CC\Presets\Scripts`
* Restart Photoshop if it was already running

## How To Use:
### 1. Rename Layers & Layer Groups by the HAML Rule
Check out Haml site -  [http://haml.info/](http:/haml.info/)


#### Make A Layer Group Named '%body'
At first gets to make a layer group named %body. The layer(s) outside '%body' layer group is excluded from an object of the processing.

------image

#### About The Text Layer
%p and %a (etc..) are usable in the textLayer. Because the textLayer's text is handled automatically, do not include the textLayer's text on the layer name.

-------image

#### About The Image (img tag)
When you want to treat the layer as an image, please rename it like 'logo.jpg' without adding "%~" or "%img" to the name of layer.
Herewith, that layer is treated as an image, and 'src' and 'alt' are added to a source file automatically.


-------image

#### Exclude From The Layer Of The Processing
When you have the layer that you want to exclude from processing, please attach "-" at the beginning of the name of the layer.

-------image

### 2. Run 'ExportHAMLSASS' Script

* Access the script from the scripts menu in Photoshop: File > Scripts > [+B]ExportHAMLSASS.
* Select the destination to save in a dialogue.

---- image

### 3. Edit the Haml file and the Sass File, and Compile.
Edit exported Haml file(.haml) and Sass file(.scss), and compile them using  [CodeKit](https://incident57.com/codekit/) or other.



# License

This Project is distributed under the terms and conditions of the MIT license.

I used the [WebZap](http://webzap.uiparade.com/) (by [UIParade](http://www.uiparade.com/)) for making of the 'sample.psd'.
