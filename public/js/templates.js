(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['schedule-fixed-slot'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n		<img id=\"teklash_logo\" src=\"/images/teklash.png\" alt=\"Techlash\" />\n	";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n	";
  return buffer;
  }

  buffer += "<tr class=\"fixed_slot\">\n	<td class=\"col_0\">";
  if (stack1 = helpers.time_string) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.time_string; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n	<td class=\"col\" colspan=\"6\">\n	";
  stack1 = helpers['if'].call(depth0, depth0.techlash, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</td>\n</tr>";
  return buffer;
  });
templates['schedule-normal-slot'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<td class=\"col\"><a href=\"http://barcampbangalore.org/bcb/?p=";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" target=\"_blank\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</a></td>\n	";
  return buffer;
  }

  buffer += "<tr class=\"session_slot\">\n	<td class=\"col_0\">";
  if (stack1 = helpers.time_string) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.time_string; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n	";
  stack1 = helpers.each.call(depth0, depth0.sessions, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</tr>";
  return buffer;
  });
templates['wall-session'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"current_session\">\n	<div class=\"current_session_location\">";
  if (stack1 = helpers.location) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.location; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n	<div class=\"current_session_title\">";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n</div>";
  return buffer;
  });
templates['wall-tweet'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return " has_media ";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<div class=\"clear\">&nbsp;</div>\n	<div class=\"tweet_media\">\n		<img src=\"";
  if (stack1 = helpers.media_url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.media_url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" />\n	</div>\n	";
  return buffer;
  }

  buffer += "<div class=\"step tweet ";
  if (stack1 = helpers.random_colour) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.random_colour; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " ";
  stack1 = helpers['if'].call(depth0, depth0.media, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" id=\"tweet_";
  if (stack1 = helpers.id_str) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id_str; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-x=\"";
  if (stack1 = helpers['x']) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0['x']; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-y=\"";
  if (stack1 = helpers['y']) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0['y']; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-z=\"";
  if (stack1 = helpers['z']) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0['z']; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-scale=\"";
  if (stack1 = helpers.scale) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.scale; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n    <div class=\"tweet_header\">\n	    <span class=\"tweet_avatar\" style=\"background-image: url(";
  if (stack1 = helpers.profile_image) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.profile_image; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ");\">&nbsp;</span>\n		<span class=\"tweet_user\">\n			<div class=\"tweet_user_name\">";
  if (stack1 = helpers.user_name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.user_name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n			<div class=\"tweet_user_handle\">@";
  if (stack1 = helpers.user_screen_name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.user_screen_name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n		</span>\n     </div>\n	<div class=\"tweet_content_container\">\n		<div class=\"tweet_content\">";
  if (stack1 = helpers.tweet_text) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.tweet_text; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n		<div class=\"tweet_time\">";
  if (stack1 = helpers.tweet_time) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.tweet_time; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</div>\n	</div>\n	";
  stack1 = helpers['if'].call(depth0, depth0.media, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    "
    + "\n</div>\n";
  return buffer;
  });
})();