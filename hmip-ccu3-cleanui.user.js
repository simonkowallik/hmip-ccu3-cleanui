// ==UserScript==
// @icon         https://raw.githubusercontent.com/simonkowallik/hmip-ccu3-cleanui/master/ipui.png
// @name         hmip-ccu3-cleanui
// @namespace    https://github.com/simonkowallik/hmip-ccu3-cleanui
// @version      1.0@CCU3v3.47.18
// @description  Material Dark for Homematic IP CCU3
// @author       Simon Kowallik
// @license      ISC
// @include      */pages/index.htm?sid=@*@
// @homepageURL  https://github.com/simonkowallik/hmip-ccu3-cleanui
// @supportURL   https://github.com/simonkowallik/hmip-ccu3-cleanui/issues
// @updateURL    https://raw.githubusercontent.com/simonkowallik/hmip-ccu3-cleanui/master/hmip-ccu3-cleanui.user.js
// @grant        none
// ==/UserScript==

"use strict";

// main function
(function () {
  // create style hash table
  var cssHash = {};
  var r;
  // loop through idCss rules (idCss is used by the CCU3 webui)
  for (let i in (r = idCss.sheet.rules)) {
    cssHash[r[i].selectorText] = r[i];
  }

/*
  //light - blue
  var color_surface = "#4690ea";
  var color_surface_light = "#98c1f3";
  var color_text = "#1f1f1f";
  var color_border = "#d0d0d0";
  var color_content_bg = "#f0f6ff";
  var color_primary = "#2583f6"; // #c98736
*/
  // dark
  var color_surface = "#1f1f1f";
  var color_surface_light = "#2f2f2f";
  var color_text = "#e0e0e0";
  var color_border = "#616161"; // #9e9e9e
  var color_content_bg = "#2f2f2f"; // #d0d0d0
  var color_primary = "#3678c9"; // #c98736

  // custom font (loaded via google font apis)
  var custom_font = "Roboto Mono";


  // include the font from googleapis
  var s = document.createElement('link');
  s.type = "text/css";
  s.rel = "stylesheet";
  s.href = "https://fonts.googleapis.com/css?family=" + custom_font;
  (document.head || document.documentElement).appendChild(s);

  // insert some base css rules
  var s2 = document.createElement('style');
  s2.type = "text/css";
  s2.innerHTML = `
* { font-family: ` + custom_font + `, Courier New ! important; color:` + color_text + `; font-size: 12px ! important; }
html, body {
  margin:0;
  padding:0;
  color:`+ color_text + `;
  background-color:`+ color_content_bg + `;
}
input, select, textarea {
  background-color:`+ color_content_bg + `;
  border: 1px solid `+ color_border + `;
}
  input:focus, select:focus, textarea:focus {
  background-color:`+ color_primary + `;
}
`;
  (document.head || document.documentElement).appendChild(s2);


  // start very targeted style updated
  cssHash['*'].style.fontFamily = custom_font + ", Courier New";

  cssHash['.MainMenuSubItem'].style.fontWeight = 'normal';
  cssHash['.MainMenuSubItem'].style.borderTopWidth = '0px';
  cssHash['.MainMenuSubItem'].style.backgroundColor = color_surface;

  cssHash['.MainMenuItem_Right'].style.backgroundColor = color_surface;


  cssHash['.MainMenuItemCaption'].style.backgroundImage = "";
  cssHash['.MainMenuItemCaption'].style.borderRadius = "0px";
  cssHash['.MainMenuItemCaption'].style.marginLeft = "5px";
  cssHash['.MainMenuItemCaption'].style.fontWeight = 'normal';

  cssHash['.MainMenuItemCaption'].style.borderWidth = "0px";
  cssHash['.MainMenuItemCaption'].style.backgroundColor = color_surface;
  cssHash['.MainMenuItemCaption'].style.color = color_text;

  cssHash['#menubar'].style.backgroundColor = color_surface;
  cssHash['#menubar'].style.borderBottom = "1px solid " + color_border;

  cssHash['.MainMenuItem_Left'].style.backgroundColor = color_surface;

  cssHash['.MainMenuSubItem_Highlight'].style.backgroundColor = color_surface;
  cssHash['.MainMenuSubItem_Highlight'].style.color = color_text;
  cssHash['.MainMenuSubMenu'].style.backgroundColor = color_surface;

  cssHash['#content'].style.backgroundColor = color_content_bg;
  cssHash['#contentRight'].style.borderLeft = "1px solid " + color_border;

  cssHash['#header'].style.backgroundColor = color_surface_light;

  cssHash['#footer'].style.backgroundColor = color_surface;
  cssHash['#footer'].style.borderTop = "1px solid " + color_border;

  cssHash['html, body'].style.backgroundColor = color_content_bg;

  cssHash['.popupControls div'].style.backgroundImage = "";

  cssHash['#tblListFold'].style.backgroundColor = color_surface;


  // update as many buttons as possible
  "._StdButton .StdButton .StdButtonBig .colorGradient50px .StdButtonInactive .Messages .NavButton .FooterButton .btnRemove .FilterCaption .FilterButton .FilterBtn .DeviceListButton .StdTableBtn".split(" ").forEach(function (el, i) {
    if (cssHash[el]) {
      cssHash[el].style.backgroundImage = "";
      cssHash[el].style.backgroundColor = color_surface;
      cssHash[el].style.color = color_text;
      cssHash[el].style.borderColor = color_border;
      cssHash[el].style.borderRadius = "2px";
      cssHash[el].style.borderWidth = "0.5px";
      cssHash[el].style.lineHeight = "1.42857143";
      cssHash[el].style.verticalAlign = "middle";

    }
  })

  // Highlighted Cells, Rows, Fields
  ".DeviceListRow_Highlight .MainMenuSubItem_Highlight .ChannelChooserRow_Highlight .ChannelChooserCell_Highlight .MultiChannelChooserRow_Highlight".split(" ").forEach(function (el, i) {
    if (cssHash[el]) {
      cssHash[el].style.backgroundColor = color_primary;
      cssHash[el].style.color = color_text;
    }
  })

  // Probably additional classes
  ".CLASS01811".split(" ").forEach(function (el, i) {
    if (cssHash[el]) {
      cssHash[el].style.color = color_text;
    }
  })

  //
  "#ic_deviceparameters #id_body #tblListFol .DeviceListCell_Invisible".split(" ").forEach(function (el, i) {
    if (cssHash[el]) {
      cssHash[el].style.backgroundColor = color_content_bg;
    }
  })


  // mass updater for various settings. This probably makes some targeted css updates redundant.. but I'm not going to fix that now..
  for (let Style in cssHash) {
    if (cssHash[Style].style) {
      // background color updates
      if (cssHash[Style].style.backgroundColor) {
        // check for #89989b
        if (cssHash[Style].style.backgroundColor === "rgb(137, 152, 155)") { cssHash[Style].style.backgroundColor = color_surface; }
        // check for #f0f0f0
        if (cssHash[Style].style.backgroundColor === "rgb(240, 240, 240)") { cssHash[Style].style.backgroundColor = color_content_bg; }
        // check for white
        if (cssHash[Style].style.backgroundColor === "white") { cssHash[Style].style.backgroundColor = color_content_bg; }
        // check for rgb(188, 199, 203)
        if (cssHash[Style].style.backgroundColor === "rgb(188, 199, 203)") { cssHash[Style].style.backgroundColor = color_content_bg; }
      }
      if (cssHash[Style].style.backgroundImage) {
          // url(/ise/img/tr50.gif) -> transparent black
          if (cssHash[Style].style.backgroundImage === 'url("/ise/img/tr50.gif")') {
              cssHash[Style].style.backgroundImage = "";
              cssHash[Style].style.backgroundColor = "rgba(0,0,0,.5)";
          }
      }
      // (text) color updates
      if (cssHash[Style].style.color) {
        // check for black
        if (cssHash[Style].style.color == "black") { cssHash[Style].style.color = color_text; }
      }
    }
  }

  // end
})();
