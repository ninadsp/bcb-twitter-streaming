(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['schedule-fixed-slot'] = template({"1":function(depth0,helpers,partials,data) {
  return "		<img id=\"teklash_logo\" src=\"./images/teklash.png\" alt=\"Techlash\" />\n";
  },"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "		"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<tr class=\"fixed_slot\">\n	<td class=\"col_0\">"
    + escapeExpression(((helper = (helper = helpers.time_string || (depth0 != null ? depth0.time_string : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"time_string","hash":{},"data":data}) : helper)))
    + "</td>\n	<td class=\"col\" colspan=\"6\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.techlash : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "	</td>\n</tr>";
},"useData":true});
templates['schedule-normal-slot'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "		<td class=\"col\"><a href=\"http://barcampbangalore.org/bcb/?p="
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">";
  stack1 = ((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</a></td>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<tr class=\"session_slot\">\n	<td class=\"col_0\">"
    + escapeExpression(((helper = (helper = helpers.time_string || (depth0 != null ? depth0.time_string : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"time_string","hash":{},"data":data}) : helper)))
    + "</td>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.sessions : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</tr>";
},"useData":true});
templates['wall-session'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"current_session\">\n	<div class=\"current_session_location\">"
    + escapeExpression(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"location","hash":{},"data":data}) : helper)))
    + "</div>\n	<div class=\"current_session_title\">"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</div>\n</div>";
},"useData":true});
templates['wall-tweet'] = template({"1":function(depth0,helpers,partials,data) {
  return " has_media ";
  },"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "	<div class=\"clear\">&nbsp;</div>\n	<div class=\"tweet_media\">\n		<img src=\""
    + escapeExpression(((helper = (helper = helpers.media_url || (depth0 != null ? depth0.media_url : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"media_url","hash":{},"data":data}) : helper)))
    + "\" />\n	</div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"step tweet "
    + escapeExpression(((helper = (helper = helpers.random_colour || (depth0 != null ? depth0.random_colour : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"random_colour","hash":{},"data":data}) : helper)))
    + " ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.media : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\" id=\"tweet_"
    + escapeExpression(((helper = (helper = helpers.id_str || (depth0 != null ? depth0.id_str : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id_str","hash":{},"data":data}) : helper)))
    + "\" data-x=\""
    + escapeExpression(((helper = (helper = helpers.x || (depth0 != null ? depth0.x : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"x","hash":{},"data":data}) : helper)))
    + "\" data-y=\""
    + escapeExpression(((helper = (helper = helpers.y || (depth0 != null ? depth0.y : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"y","hash":{},"data":data}) : helper)))
    + "\" data-z=\""
    + escapeExpression(((helper = (helper = helpers.z || (depth0 != null ? depth0.z : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"z","hash":{},"data":data}) : helper)))
    + "\" data-scale=\""
    + escapeExpression(((helper = (helper = helpers.scale || (depth0 != null ? depth0.scale : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"scale","hash":{},"data":data}) : helper)))
    + "\">\n    <div class=\"tweet_header\">\n	    <span class=\"tweet_avatar\" style=\"background-image: url("
    + escapeExpression(((helper = (helper = helpers.profile_image || (depth0 != null ? depth0.profile_image : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"profile_image","hash":{},"data":data}) : helper)))
    + ");\">&nbsp;</span>\n		<span class=\"tweet_user\">\n			<div class=\"tweet_user_name\">"
    + escapeExpression(((helper = (helper = helpers.user_name || (depth0 != null ? depth0.user_name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"user_name","hash":{},"data":data}) : helper)))
    + "</div>\n			<div class=\"tweet_user_handle\">@"
    + escapeExpression(((helper = (helper = helpers.user_screen_name || (depth0 != null ? depth0.user_screen_name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"user_screen_name","hash":{},"data":data}) : helper)))
    + "</div>\n		</span>\n     </div>\n	<div class=\"tweet_content_container\">\n		<div class=\"tweet_content\">";
  stack1 = ((helper = (helper = helpers.tweet_text || (depth0 != null ? depth0.tweet_text : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"tweet_text","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  buffer += "</div>\n		<div class=\"tweet_time\">"
    + escapeExpression(((helper = (helper = helpers.tweet_time || (depth0 != null ? depth0.tweet_time : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"tweet_time","hash":{},"data":data}) : helper)))
    + "</div>\n	</div>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.media : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>\n";
},"useData":true});
})();