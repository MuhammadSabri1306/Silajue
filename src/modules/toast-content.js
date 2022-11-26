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
	},
	saveProduct: {
		success: {
			severity:"success",
			summary: "Produk",
			detail:"Berhasil menyimpan produk."
		},
		error: {
			severity:"error",
			summary: "Produk",
			detail:"Terjadi masalah saat menghubungi server."
		}
	},
	deleteProduct: {
		success: {
			severity:"success",
			summary: "Produk",
			detail:"Berhasil menghapus produk."
		},
		error: {
			severity:"error",
			summary: "Produk",
			detail:"Terjadi masalah saat menghubungi server."
		}
	},
	addInvoice: {
		success: {
			severity:"success",
			summary: "Invoice",
			detail:"Produk berhasil ditambahkan ke invoice."
		},
		error: {
			severity:"error",
			summary: "Invoice",
			detail:"Terjadi masalah saat menghubungi server."
		}
	},
	fetchData: {
		error: {
			severity:"error",
			summary: "Koneksi gagal",
			detail:"Terjadi masalah saat menghubungi server. Coba lagi beberapa saat atau anda bisa menghubungi admin web."
		}
	},
	sendInvoiceVerification: {
		success: {
			severity:"success",
			summary: "Bukti transfer berhasil dikirim",
			detail:"Kami akan segera melakukan verifikasi terhadap invoice anda."
		},
		error: {
			severity:"error",
			summary: "Bukti transfer tidak terkirim",
			detail:"Terjadi masalah saat menghubungi server."
		}
	},
	saveBlog: {
		success: {
			severity:"success",
			summary: "Artikel",
			detail:"Data berhasil disimpan."
		},
		error: {
			severity:"error",
			summary: "Artikel",
			detail:"Terjadi masalah saat menghubungi server."
		}
	},
	deleteBlog: {
		success: {
			severity:"success",
			summary: "Artikel",
			detail:"Berhasil menghapus artikel."
		},
		error: {
			severity:"error",
			summary: "Artikel tidak terhapus.",
			detail:"Terjadi masalah saat menghubungi server."
		}
	}
};

export default toastContent;