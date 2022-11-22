const toastContent = {
	login: {
		success: {
			severity:"success",
			summary: "Berhasil Login.",
			detail:"Anda akan diarahkan ke halaman beranda."
		},
		error: {
			severity:"error",
			summary: "Gagal Login",
			detail:"Silahkan masukkan username dan password yang valid."
		}
	},
	register: {
		success: {
			severity:"success",
			summary: "Berhasil membuat akun.",
			detail:"Silahkan login menggunakan akun anda."
		},
		error: {
			severity:"error",
			summary: "Gagal Register",
			detail:"Terjadi masalah saat menghubungi server."
		}
	},
	addCart: {
		success: {
			severity:"success",
			summary: "Keranjang",
			detail:"Berhasil menambahkan item."
		},
		error: {
			severity:"error",
			summary: "Keranjang",
			detail:"Terjadi masalah saat menghubungi server."
		}
	},
	saveCategory: {
		success: {
			severity:"success",
			summary: "Kategori",
			detail:"Berhasil menyimpan kategori."
		},
		error: {
			severity:"error",
			summary: "Kategori",
			detail:"Terjadi masalah saat menghubungi server."
		}
	},
	deleteCategory: {
		success: {
			severity:"success",
			summary: "Kategori",
			detail:"Berhasil menghapus kategori."
		},
		error: {
			severity:"error",
			summary: "Kategori",
			detail:"Terjadi masalah saat menghubungi server."
		}
	}
};

export default toastContent;