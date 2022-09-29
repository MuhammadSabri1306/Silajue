import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { faFacebook, faInstagram, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
// import { faPhoneFlip } from "@fortawesome/free-regular-svg-icons";
import { faBars, faBarsStaggered, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

library.add(faFacebook, faInstagram, faTwitter, faWhatsapp, faBars, faBarsStaggered, faMagnifyingGlass);

export default FontAwesomeIcon;
