import { toTimeStr } from "./date-id";

export const createInvoiceCode = userId => {
	const timeEpoch = Date.now();
	return `INV${ userId }T${ timeEpoch }`;
};

export const formatInvoice = invoices => {
	return invoices.map(item => {
		const date = new Date(item.created_at);
		const dateTime = `${ date.getDate() }/${ date.getMonth() }/${ date.getFullYear() } ${ toTimeStr(date, ":").time }`;

		const status = (item.status == "verifikasi" && !item.proof_payment) ? "belum verifikasi" : (item.status == "verifikasi") ? "pengajuan verifikasi" : item.status;

		const product = item.detail_invoice.map(produkItem => {
			return {
				itemCount: produkItem.item_count,
				...produkItem.produk
			};
		});

		const userAddress = {
			full: `${ item.user.address.toUpperCase() }, ${ item.user.village.name }, ${ item.user.village.district.name }, ${ item.user.village.district.regency.name }, ${ item.user.village.district.regency.province.name }`,
			address: item.user.address.toUpperCase(),
			village: item.user.village.name,
			district: item.user.village.district.name,
			regency: item.user.village.district.regency.name,
			province: item.user.village.district.regency.province.name
		};

		return {
			dateTime,
			status,
			product,
			id: item.id,
			noInvoice: item.no_invoice,
			transferNote: item.proof_payment,
			userName: item.user.name,
			userAddress,
			userVillageId: item.user.village_id,
			userPhoneNumber: item.user.phone_number,
			userEmail: item.user.email,
			userIdCard: item.user.identity_card ? "https://silajue.taekwondosulsel.info/storage/" + item.user.identity_card : null,
			totalPrice: item.total_price
		};
	});
};