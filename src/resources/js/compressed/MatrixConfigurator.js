!function(a){/**
 * Matrix configurator class
 */
Craft.MatrixConfigurator=Garnish.Base.extend({fieldTypeInfo:null,inputNamePrefix:null,inputIdPrefix:null,$container:null,$blockTypesColumnContainer:null,$fieldsColumnContainer:null,$fieldSettingsColumnContainer:null,$blockTypeItemsOuterContainer:null,$blockTypeItemsContainer:null,$fieldItemsContainer:null,$fieldSettingItemsContainer:null,$newBlockTypeBtn:null,$newFieldBtn:null,blockTypes:null,selectedBlockType:null,blockTypeSort:null,totalNewBlockTypes:0,init:function(b,d){this.fieldTypeInfo=b,this.inputNamePrefix=d,this.inputIdPrefix=Craft.formatInputId(this.inputNamePrefix),this.$container=a("#"+this.inputIdPrefix+"-matrix-configurator:first .input:first"),this.$blockTypesColumnContainer=this.$container.children(".block-types").children(),this.$fieldsColumnContainer=this.$container.children(".fields").children(),this.$fieldSettingsColumnContainer=this.$container.children(".field-settings").children(),this.$blockTypeItemsOuterContainer=this.$blockTypesColumnContainer.children(".items"),this.$blockTypeItemsContainer=this.$blockTypeItemsOuterContainer.children(".blocktypes"),this.$fieldItemsOuterContainer=this.$fieldsColumnContainer.children(".items"),this.$fieldSettingItemsContainer=this.$fieldSettingsColumnContainer.children(".items"),this.setContainerHeight(),this.$newBlockTypeBtn=this.$blockTypeItemsOuterContainer.children(".btn"),this.$newFieldBtn=this.$fieldItemsOuterContainer.children(".btn"),
// Find the existing block types
this.blockTypes={};for(var e=this.$blockTypeItemsContainer.children(),f=0;f<e.length;f++){var g=a(e[f]),h=g.data("id");this.blockTypes[h]=new c(this,g);
// Is this a new block type?
var i="string"==typeof h&&h.match(/new(\d+)/);i&&i[1]>this.totalNewBlockTypes&&(this.totalNewBlockTypes=parseInt(i[1]))}this.blockTypeSort=new Garnish.DragSort(e,{handle:".move",axis:"y"}),this.addListener(this.$newBlockTypeBtn,"click","addBlockType"),this.addListener(this.$newFieldBtn,"click","addFieldToSelectedBlockType"),this.addListener(this.$blockTypesColumnContainer,"resize","setContainerHeight"),this.addListener(this.$fieldsColumnContainer,"resize","setContainerHeight"),this.addListener(this.$fieldSettingsColumnContainer,"resize","setContainerHeight")},setContainerHeight:function(){setTimeout(a.proxy(function(){var a=Math.max(this.$blockTypesColumnContainer.height(),this.$fieldsColumnContainer.height(),this.$fieldSettingsColumnContainer.height(),400);this.$container.height(a)},this),1)},getFieldTypeInfo:function(a){for(var b=0;b<this.fieldTypeInfo.length;b++)if(this.fieldTypeInfo[b].type==a)return this.fieldTypeInfo[b]},addBlockType:function(){this.getBlockTypeSettingsModal(),this.blockTypeSettingsModal.show(),this.blockTypeSettingsModal.onSubmit=a.proxy(function(b,d){this.totalNewBlockTypes++;var e="new"+this.totalNewBlockTypes,f=a('<div class="matrixconfigitem mci-blocktype" data-id="'+e+'"><div class="name"></div><div class="handle code"></div><div class="actions"><a class="move icon" title="'+Craft.t("app","Reorder")+'"></a><a class="settings icon" title="'+Craft.t("app","Settings")+'"></a></div><input class="hidden" name="types[craft\\app\\fields\\Matrix][blockTypes]['+e+'][name]"><input class="hidden" name="types[craft\\app\\fields\\Matrix][blockTypes]['+e+'][handle]"></div>').appendTo(this.$blockTypeItemsContainer);this.blockTypes[e]=new c(this,f),this.blockTypes[e].applySettings(b,d),this.blockTypes[e].select(),this.blockTypes[e].addField(),this.blockTypeSort.addItems(f)},this)},addFieldToSelectedBlockType:function(){this.selectedBlockType&&this.selectedBlockType.addField()},getBlockTypeSettingsModal:function(){return this.blockTypeSettingsModal||(this.blockTypeSettingsModal=new b),this.blockTypeSettingsModal}});/**
 * Block type settings modal class
 */
var b=Garnish.Modal.extend({init:function(){this.base(),this.$form=a('<form class="modal fitted"/>').appendTo(Garnish.$bod),this.setContainer(this.$form),this.$body=a('<div class="body"/>').appendTo(this.$form),this.$nameField=a('<div class="field"/>').appendTo(this.$body),this.$nameHeading=a('<div class="heading"/>').appendTo(this.$nameField),this.$nameLabel=a('<label for="new-block-type-name">'+Craft.t("app","Name")+"</label>").appendTo(this.$nameHeading),this.$nameInstructions=a('<div class="instructions"><p>'+Craft.t("app","What this block type will be called in the CP.")+"</p></div>").appendTo(this.$nameHeading),this.$nameInputContainer=a('<div class="input"/>').appendTo(this.$nameField),this.$nameInput=a('<input type="text" class="text fullwidth" id="new-block-type-name"/>').appendTo(this.$nameInputContainer),this.$nameErrorList=a('<ul class="errors"/>').appendTo(this.$nameInputContainer).hide(),this.$handleField=a('<div class="field"/>').appendTo(this.$body),this.$handleHeading=a('<div class="heading"/>').appendTo(this.$handleField),this.$handleLabel=a('<label for="new-block-type-handle">'+Craft.t("app","Handle")+"</label>").appendTo(this.$handleHeading),this.$handleInstructions=a('<div class="instructions"><p>'+Craft.t("app","How you’ll refer to this block type in the templates.")+"</p></div>").appendTo(this.$handleHeading),this.$handleInputContainer=a('<div class="input"/>').appendTo(this.$handleField),this.$handleInput=a('<input type="text" class="text fullwidth code" id="new-block-type-handle"/>').appendTo(this.$handleInputContainer),this.$handleErrorList=a('<ul class="errors"/>').appendTo(this.$handleInputContainer).hide(),this.$deleteBtn=a('<a class="error left hidden" style="line-height: 30px;">'+Craft.t("app","Delete")+"</a>").appendTo(this.$body),this.$buttons=a('<div class="buttons right" style="margin-top: 0;"/>').appendTo(this.$body),this.$cancelBtn=a('<div class="btn">'+Craft.t("app","Cancel")+"</div>").appendTo(this.$buttons),this.$submitBtn=a('<input type="submit" class="btn submit"/>').appendTo(this.$buttons),this.handleGenerator=new Craft.HandleGenerator(this.$nameInput,this.$handleInput),this.addListener(this.$cancelBtn,"click","hide"),this.addListener(this.$form,"submit","onFormSubmit"),this.addListener(this.$deleteBtn,"click","onDeleteClick")},onFormSubmit:function(a){
// Prevent multi form submits with the return key
if(a.preventDefault(),this.visible){this.handleGenerator.listening&&
// Give the handle a chance to catch up with the input
this.handleGenerator.updateTarget();
// Basic validation
var b=Craft.trim(this.$nameInput.val()),c=Craft.trim(this.$handleInput.val());b&&c?(this.hide(),this.onSubmit(b,c)):Garnish.shake(this.$form)}},onDeleteClick:function(){confirm(Craft.t("app","Are you sure you want to delete this block type?"))&&(this.hide(),this.onDelete())},show:function(b,c,d){this.$nameInput.val("string"==typeof b?b:""),this.$handleInput.val("string"==typeof c?c:""),c?this.handleGenerator.stopListening():this.handleGenerator.startListening(),"undefined"==typeof b?(this.$deleteBtn.addClass("hidden"),this.$submitBtn.val(Craft.t("app","Create"))):(this.$deleteBtn.removeClass("hidden"),this.$submitBtn.val(Craft.t("app","Save"))),this.displayErrors("name",d?d.name:null),this.displayErrors("handle",d?d.handle:null),Garnish.isMobileBrowser()||setTimeout(a.proxy(function(){this.$nameInput.focus()},this),100),this.base()},displayErrors:function(b,c){var d=this["$"+b+"Input"],e=this["$"+b+"ErrorList"];if(e.children().remove(),c){d.addClass("error"),e.show();for(var f=0;f<c.length;f++)a("<li/>").text(c[f]).appendTo(e)}else d.removeClass("error"),e.hide()}}),c=Garnish.Base.extend({configurator:null,id:null,errors:null,inputNamePrefix:null,inputIdPrefix:null,$item:null,$nameLabel:null,$handleLabel:null,$nameHiddenInput:null,$handleHiddenInput:null,$settingsBtn:null,$fieldItemsContainer:null,$fieldSettingsContainer:null,fields:null,selectedField:null,fieldSort:null,totalNewFields:0,fieldSettings:null,init:function(b,c){this.configurator=b,this.$item=c,this.id=this.$item.data("id"),this.errors=this.$item.data("errors"),this.inputNamePrefix=this.configurator.inputNamePrefix+"[blockTypes]["+this.id+"]",this.inputIdPrefix=this.configurator.inputIdPrefix+"-blockTypes-"+this.id,this.$nameLabel=this.$item.children(".name"),this.$handleLabel=this.$item.children(".handle"),this.$nameHiddenInput=this.$item.find('input[name$="[name]"]:first'),this.$handleHiddenInput=this.$item.find('input[name$="[handle]"]:first'),this.$settingsBtn=this.$item.find(".settings"),
// Find the field items container if it exists, otherwise create it
this.$fieldItemsContainer=this.configurator.$fieldItemsOuterContainer.children('[data-id="'+this.id+'"]:first'),this.$fieldItemsContainer.length||(this.$fieldItemsContainer=a('<div data-id="'+this.id+'"/>').insertBefore(this.configurator.$newFieldBtn)),
// Find the field settings container if it exists, otherwise create it
this.$fieldSettingsContainer=this.configurator.$fieldSettingItemsContainer.children('[data-id="'+this.id+'"]:first'),this.$fieldSettingsContainer.length||(this.$fieldSettingsContainer=a('<div data-id="'+this.id+'"/>').appendTo(this.configurator.$fieldSettingItemsContainer)),
// Find the existing fields
this.fields={};for(var e=this.$fieldItemsContainer.children(),f=0;f<e.length;f++){var g=a(e[f]),h=g.data("id");this.fields[h]=new d(this.configurator,this,g);
// Is this a new field?
var i="string"==typeof h&&h.match(/new(\d+)/);i&&i[1]>this.totalNewFields&&(this.totalNewFields=parseInt(i[1]))}this.addListener(this.$item,"click","select"),this.addListener(this.$settingsBtn,"click","showSettings"),this.fieldSort=new Garnish.DragSort(e,{handle:".move",axis:"y",onSortChange:a.proxy(function(){
// Adjust the field setting containers to match the new sort order
for(var b=0;b<this.fieldSort.$items.length;b++){var c=a(this.fieldSort.$items[b]),d=c.data("id"),e=this.fields[d];e.$fieldSettingsContainer.appendTo(this.$fieldSettingsContainer)}},this)})},select:function(){this.configurator.selectedBlockType!=this&&(this.configurator.selectedBlockType&&this.configurator.selectedBlockType.deselect(),this.configurator.$fieldsColumnContainer.removeClass("hidden").trigger("resize"),this.$fieldItemsContainer.removeClass("hidden"),this.$item.addClass("sel"),this.configurator.selectedBlockType=this)},deselect:function(){this.$item.removeClass("sel"),this.configurator.$fieldsColumnContainer.addClass("hidden").trigger("resize"),this.$fieldItemsContainer.addClass("hidden"),this.$fieldSettingsContainer.addClass("hidden"),this.configurator.selectedBlockType=null,this.selectedField&&this.selectedField.deselect()},showSettings:function(){var b=this.configurator.getBlockTypeSettingsModal();b.show(this.$nameHiddenInput.val(),this.$handleHiddenInput.val(),this.errors),b.onSubmit=a.proxy(this,"applySettings"),b.onDelete=a.proxy(this,"selfDestruct")},applySettings:function(a,b){this.errors&&(this.errors=null,this.$settingsBtn.removeClass("error")),this.$nameLabel.text(a),this.$handleLabel.text(b),this.$nameHiddenInput.val(a),this.$handleHiddenInput.val(b)},addField:function(){this.totalNewFields++;var b="new"+this.totalNewFields,c=a('<div class="matrixconfigitem mci-field" data-id="'+b+'"><div class="name"><em class="light">'+Craft.t("app","(blank)")+'</em>&nbsp;</div><div class="handle code">&nbsp;</div><div class="actions"><a class="move icon" title="'+Craft.t("app","Reorder")+'"></a></div></div>').appendTo(this.$fieldItemsContainer);this.fields[b]=new d(this.configurator,this,c),this.fields[b].select(),this.fieldSort.addItems(c)},selfDestruct:function(){this.deselect(),this.$item.remove(),this.$fieldItemsContainer.remove(),this.$fieldSettingsContainer.remove(),this.configurator.blockTypes[this.id]=null,delete this.configurator.blockTypes[this.id]}}),d=Garnish.Base.extend({configurator:null,blockType:null,id:null,inputNamePrefix:null,inputIdPrefix:null,selectedFieldType:null,initializedFieldTypeSettings:null,$item:null,$nameLabel:null,$handleLabel:null,$fieldSettingsContainer:null,$nameInput:null,$handleInput:null,$requiredCheckbox:null,$typeSelect:null,$typeSettingsContainer:null,$deleteBtn:null,init:function(b,c,d){this.configurator=b,this.blockType=c,this.$item=d,this.id=this.$item.data("id"),this.inputNamePrefix=this.blockType.inputNamePrefix+"[fields]["+this.id+"]",this.inputIdPrefix=this.blockType.inputIdPrefix+"-fields-"+this.id,this.initializedFieldTypeSettings={},this.$nameLabel=this.$item.children(".name"),this.$handleLabel=this.$item.children(".handle"),
// Find the field settings container if it exists, otherwise create it
this.$fieldSettingsContainer=this.blockType.$fieldSettingsContainer.children('[data-id="'+this.id+'"]:first');var e=!this.$fieldSettingsContainer.length;e&&(this.$fieldSettingsContainer=a(this.getDefaultFieldSettingsHtml()).appendTo(this.blockType.$fieldSettingsContainer)),this.$nameInput=this.$fieldSettingsContainer.find('input[name$="[name]"]:first'),this.$handleInput=this.$fieldSettingsContainer.find('input[name$="[handle]"]:first'),this.$requiredCheckbox=this.$fieldSettingsContainer.find('input[type="checkbox"][name$="[required]"]:first'),this.$typeSelect=this.$fieldSettingsContainer.find('select[name$="[type]"]:first'),this.$typeSettingsContainer=this.$fieldSettingsContainer.children(".fieldtype-settings:first"),this.$deleteBtn=this.$fieldSettingsContainer.children("a.delete:first"),e?this.setFieldType("craft\\app\\fields\\PlainText"):(this.selectedFieldType=this.$typeSelect.val(),this.initializedFieldTypeSettings[this.selectedFieldType]=this.$typeSettingsContainer.children()),this.$handleInput.val()||new Craft.HandleGenerator(this.$nameInput,this.$handleInput),this.addListener(this.$item,"click","select"),this.addListener(this.$nameInput,"textchange","updateNameLabel"),this.addListener(this.$handleInput,"textchange","updateHandleLabel"),this.addListener(this.$requiredCheckbox,"change","updateRequiredIcon"),this.addListener(this.$typeSelect,"change","onTypeSelectChange"),this.addListener(this.$deleteBtn,"click","confirmDelete")},select:function(){this.blockType.selectedField!=this&&(this.blockType.selectedField&&this.blockType.selectedField.deselect(),this.configurator.$fieldSettingsColumnContainer.removeClass("hidden").trigger("resize"),this.blockType.$fieldSettingsContainer.removeClass("hidden"),this.$fieldSettingsContainer.removeClass("hidden"),this.$item.addClass("sel"),this.blockType.selectedField=this,Garnish.isMobileBrowser()||setTimeout(a.proxy(function(){this.$nameInput.focus()},this),100))},deselect:function(){this.$item.removeClass("sel"),this.configurator.$fieldSettingsColumnContainer.addClass("hidden").trigger("resize"),this.blockType.$fieldSettingsContainer.addClass("hidden"),this.$fieldSettingsContainer.addClass("hidden"),this.blockType.selectedField=null},updateNameLabel:function(){var a=this.$nameInput.val();this.$nameLabel.html((a?Craft.escapeHtml(a):'<em class="light">'+Craft.t("app","(blank)")+"</em>")+"&nbsp;")},updateHandleLabel:function(){this.$handleLabel.html(Craft.escapeHtml(this.$handleInput.val())+"&nbsp;")},updateRequiredIcon:function(){this.$requiredCheckbox.prop("checked")?this.$nameLabel.addClass("required"):this.$nameLabel.removeClass("required")},onTypeSelectChange:function(){this.setFieldType(this.$typeSelect.val())},setFieldType:function(b){this.selectedFieldType&&this.initializedFieldTypeSettings[this.selectedFieldType].detach(),this.selectedFieldType=b,this.$typeSelect.val(b);var c,d,e="undefined"==typeof this.initializedFieldTypeSettings[b];if(e){var f=this.configurator.getFieldTypeInfo(b),g=this.getParsedFieldTypeHtml(f.settingsBodyHtml);d=this.getParsedFieldTypeHtml(f.settingsFootHtml),c=a("<div>"+g+"</div>"),this.initializedFieldTypeSettings[b]=c}else c=this.initializedFieldTypeSettings[b];c.appendTo(this.$typeSettingsContainer),e&&(Craft.initUiElements(c),Garnish.$bod.append(d)),
// Firefox might have been sleeping on the job.
this.$typeSettingsContainer.trigger("resize")},getParsedFieldTypeHtml:function(a){return"string"==typeof a?(a=a.replace(/__BLOCK_TYPE__/g,this.blockType.id),a=a.replace(/__FIELD__/g,this.id)):a="",a},getDefaultFieldSettingsHtml:function(){var a='<div data-id="'+this.id+'"><div class="field" id="'+this.inputIdPrefix+'-name-field"><div class="heading"><label for="'+this.inputIdPrefix+'-name">'+Craft.t("app","Name")+'</label></div><div class="input"><input class="text fullwidth" type="text" id="'+this.inputIdPrefix+'-name" name="'+this.inputNamePrefix+'[name]" autofocus="" autocomplete="off"/></div></div><div class="field" id="'+this.inputIdPrefix+'-handle-field"><div class="heading"><label class="required" for="'+this.inputIdPrefix+'-handle">'+Craft.t("app","Handle")+'</label></div><div class="input"><input class="text fullwidth code" type="text" id="'+this.inputIdPrefix+'-handle" name="'+this.inputNamePrefix+'[handle]" autofocus="" autocomplete="off"/></div></div><div class="field" id="'+this.inputIdPrefix+'-instructions-field"><div class="heading"><label for="'+this.inputIdPrefix+'-instructions">'+Craft.t("app","Instructions")+'</label></div><div class="input"><textarea class="text nicetext fullwidth" rows="2" cols="50" id="'+this.inputIdPrefix+'-instructions" name="'+this.inputNamePrefix+'[instructions]"></textarea></div></div><div class="field checkboxfield"><label><input type="hidden" name="'+this.inputNamePrefix+'[required]" value=""/><input type="checkbox" value="1" name="'+this.inputNamePrefix+'[required]"/> '+Craft.t("app","This field is required")+"</label></div>";Craft.isLocalized&&(a+='<div class="field checkboxfield"><label><input type="hidden" name="'+this.inputNamePrefix+'[translatable]" value=""/><input type="checkbox" value="1" name="'+this.inputNamePrefix+'[translatable]"/> '+Craft.t("app","This field is translatable")+"</label></div>"),a+='<hr/><div class="field" id="type-field"><div class="heading"><label for="type">'+Craft.t("app","Field Type")+'</label></div><div class="input"><div class="select"><select id="type" class="fieldtoggle" name="'+this.inputNamePrefix+'[type]">';for(var b=0;b<this.configurator.fieldTypeInfo.length;b++){var c=this.configurator.fieldTypeInfo[b],d="craft\\app\\fields\\PlainText"==c.type;a+='<option value="'+c.type+'"'+(d?' selected=""':"")+">"+c.name+"</option>"}return a+='</select></div></div></div><div class="fieldtype-settings"/><hr/><a class="error delete">'+Craft.t("app","Delete")+"</a></div>"},confirmDelete:function(){confirm(Craft.t("app","Are you sure you want to delete this field?"))&&this.selfDestruct()},selfDestruct:function(){this.deselect(),this.$item.remove(),this.$fieldSettingsContainer.remove(),this.blockType.fields[this.id]=null,delete this.blockType.fields[this.id]}})}(jQuery);
//# sourceMappingURL=MatrixConfigurator.js.map