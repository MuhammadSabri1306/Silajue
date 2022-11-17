import { reactive, watch } from "vue";
import { useRoute } from "vue-router";

const url = reactive({
	fb: null,
	wa: null,
	twitter: null,
	linkedin: null,
	copyLink: null
});

const setupUrl = blogUrl => {

	url.fb = "https://facebook.com/share.php?u=" + blogUrl;
	url.wa = "https://wa.me/?text=" + blogUrl;
	url.twitter = "https://twitter.com/share?ref_src=" + blogUrl;

};
// <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-show-count="false">Tweet</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

const shareBlogTo = socialKey => {
	try {

		const targetUrl = url[socialKey];
		window.open(url[socialKey], "_blank");
	
	} catch(err) {
		console.warn(err);
	}
};

export const useBlogShare = () => ({ url, shareBlogTo, setupUrl });