import { reactive, watch } from "vue";
import http from "@/modules/http-common";
import { getCookie, setCookie } from "@/modules/apps-cookie";

const desa = reactive({
	list: [],
	showListbox: false,
	idKec: null,
	id: null,
	text: null
});

const fetchDesa = async () => {
	try {

		const response = await http.get("villages/" + desa.idKec);
		const data = response.data.data;

		if(Array.isArray(data)) {
			if(desa.list.length > 0)
				desa.list.splice(0, desa.list.length);
			data.forEach(item => desa.list.push(item));
		}

	} catch(err) {
		console.error(err);
	}
};

const onDesaChange = event => {
	if(!event.value)
		return;

	desa.id = event.value.id;
	desa.text = event.value.name;
	desa.showListbox = false;
};

const kec = reactive({
	list: [],
	showListbox: false,
	idKab: null,
	id: null,
	text: null
});

const fetchKec = async () => {
	try {

		const response = await http.get("districts/" + kec.idKab);
		const data = response.data.data;

		if(Array.isArray(data)) {
			if(kec.list.length > 0)
				kec.list.splice(0, kec.list.length);
			data.forEach(item => kec.list.push(item));
		}

	} catch(err) {
		console.error(err);
	}
};

const onKecChange = event => {
	if(!event.value)
		return;

	kec.id = event.value.id;
	kec.text = event.value.name;
	kec.showListbox = false;

	desa.idKec = kec.id;
	fetchDesa();
};

const kab = reactive({
	list: [],
	showListbox: false,
	idProv: null,
	id: null,
	text: null
});

const fetchKab = async () => {
	try {

		const response = await http.get("regencies/" + kab.idProv);
		const data = response.data.data;

		if(Array.isArray(data)) {
			if(kab.list.length > 0)
				kab.list.splice(0, kab.list.length);
			data.forEach(item => kab.list.push(item));
		}

	} catch(err) {
		console.error(err);
	}
};

const onKabChange = event => {
	if(!event.value)
		return;

	kab.id = event.value.id;
	kab.text = event.value.name;
	kab.showListbox = false;

	kec.idKab = kab.id;
	fetchKec();
};

const prov = reactive({
	list: [],
	showListbox: false,
	id: null,
	text: null
});

const fetchProv = async () => {
	try {

		const response = await http.get("/province");
		const data = response.data.data;

		if(Array.isArray(data)) {
			if(prov.list.length > 0)
				prov.list.splice(0, prov.list.length);
			data.forEach(item => prov.list.push(item));
		}

	} catch(err) {
		console.error(err);
	}
};

const onProvChange = event => {
	if(!event.value)
		return;

	prov.id = event.value.id;
	prov.text = event.value.name;
	prov.showListbox = false;

	kab.idProv = prov.id;
	fetchKab();
};

export const useRegion = () => {
	return { prov, onProvChange, fetchProv, kab, onKabChange, kec, onKecChange, desa, onDesaChange };
};