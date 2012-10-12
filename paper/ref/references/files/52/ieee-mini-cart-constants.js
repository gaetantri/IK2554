var DOMAIN_NAME = "ieee.org";
var IEEE_MASHUP_ENGINE_SERVER_URL_DEF = "https://www.ieee.org";
var MC_MINICART_SERVLET_URL = "https://www.ieee.org/ieee-mashup/MiniCartServlet";
var MC_MINICART_CHECKOUT_URL = "https://www.ieee.org/cart/checkout/page.html";
var MC_MEMBERSHIP_INCOMPLETE_URL = "https://www.ieee.org/ieee-mashup/MembershipIncomplete";
var MC_MINICART_BATCH_SIZE = 5;

var add_item_json = '[{"partNum":"PER500-ELE","quantity":"1","membershipType":"membership","country":"US"},'+
'{"partNum":"PAGOTCSVT","quantity":"1","membershipType":"membership","country":"US"}]';

var mc_system_error = "Sorry, this function is temporarily unavailable. Please try again later.";

var MC_COMPLETE_MEMBERSHIP_URL = "https://www.ieee.org/membership-application/public/addservice.html";

var MC_TIMEOUT_ERROR_MSG = 'The system is experiencing an unusual delay. Please <a href="#" onclick="javascript:ibpMiniCart.refreshWindow();">refresh your browser</a> or try again later.'; 

var MC_ERROR_CONTACT_URL = "http://www.ieee.org/about/contact_center/index.html?WT.mc_id=hc_contact";

var IBP_SOA_TIMEOUT	= "IBP-SOA-TIMEOUT";

var MC_TIMEOUT_DEF = 61000;

var MC_OPERATION_DELAY_MSG_FLAG = "true";

var MC_OPERATION_DELAY_TIMEOUT_DEF = 45000;

var MC_OPERATION_DELAY_MSG_DEF = "The operation is taking time more than expected. Please wait.";

var IEEE_NETNSIGHT_IMAGE_LOCATION = "https://origin.www.ieee.org/";

var MC_LOADING_MSG = "Loading...";

var MC_LOADING_DELAY_MSG_DEF = "Please wait.Your cart is loading...";

var MC_ADDING_MSG = "Adding selected item(s)...";

var MC_ADDING_DELAY_MSG_DEF = "Please wait while selected item(s) are added to your cart.";