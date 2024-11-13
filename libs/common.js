import { domain } from "./config/siteConfig";

export const check_Image = (Image) => {
    let baseUrl = `https://${domain}`
    if (Image) {
        if (Image.indexOf('https') == -1) {
            return baseUrl + Image;
        } else if (Image.indexOf('https') == 0) {
            return Image;
        }
    }else{
       return '/empty_state.svg'
    }
}
