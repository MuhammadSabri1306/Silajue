const toastContent = {
	login: {
		success: {
			success: true,
			title: "Berhasil Login.",
			message:"Anda akan diarahkan ke halaman beranda."
		},
		error: {
			success: false,
			title: "Gagal Login",
			message:"Silahkan masukkan username dan password yang valid."
		}
	},
	register: {
		success: {
			success: true,
			title: "Berhasil membuat akun.",
			message:"Silahkan login menggunakan akun anda."
		},
		error: {
			success: false,
			title: "Gagal Register",
			message:"Terjadi masalah saat menghubungi server."
		}
	},
	addCart: {
		success: {
			success: true,
			title: "Keranjang",
			message:"Berhasil menambahkan item."
		},
		error: {
			success: false,
			title: "Keranjang",
			message:"Terjadi masalah saat menghubungi server."
		}
	},
	saveCategory: {
		success: {
			success: true,
			title: "Kategori",
			message:"Berhasil menyimpan kategori."
		},
		error: {
			success: false,
			title: "Kategori",
			message:"Terjadi masalah saat menghubungi server."
		}
	},
	deleteCategory: {
		success: {
			success: true,
			title: "Kategori",
			message:"Berhasil menghapus kategori."
		},
		error: {
			success: false,
			title: "Kategori",
			message:"Terjadi masalah saat menghubungi server."
		}
	},
	saveProduct: {
		success: {
			success: true,
			title: "Produk",
			message:"Berhasil menyimpan produk."
		},
		error: {
			success: false,
			title: "Produk",
			message:"Terjadi masalah saat menghubungi server."
		}
	},
	deleteProduct: {
		success: {
			success: true,
			title: "Produk",
			message:"Berhasil menghapus produk."
		},
		error: {
			success: false,
			title: "Produk",
			message:"Terjadi masalah saat menghubungi server."
		}
	},
	addInvoice: {
		success: {
			success: true,
			title: "Invoice",
			message:"Produk berhasil ditambahkan ke invoice."
		},
		error: {
			success: false,
			title: "Invoice",
			message:"Terjadi masalah saat menghubungi server."
		}
	},
	fetchData: {
		error: {
			success: false,
			title: "Koneksi gagal",
			message:"Terjadi masalah saat menghubungi server. Coba lagi beberapa saat atau anda bisa menghubungi admin web."
		}
	},
	sendInvoiceVerification: {
		success: {
			success: true,
			title: "Bukti transfer berhasil dikirim",
			message:"Kami akan segera melakukan verifikasi terhadap invoice anda."
		},
		error: {
			success: false,
			title: "Bukti transfer tidak terkirim",
			message:"Terjadi masalah saat menghubungi server."
		}
	},
	saveBlog: {
		success: {
			success: true,
			title: "Artikel",
			message:"Data berhasil disimpan."
		},
		error: {
			success: false,
			title: "Artikel",
			message:"Terjadi masalah saat menghubungi server."
		}
	},
	deleteBlog: {
		success: {
			success: true,
			title: "Artikel",
			message:"Berhasil menghapus artikel."
		},
		error: {
			success: false,
			title: "Artikel tidak terhapus.",
			message:"Terjadi masalah saat menghubungi server."
		}
	},
	deleteInvoice: {
		success: {
			success: true,
			title: "Invoice",
			message:"Berhasil menghapus invoice."
		},
		error: {
			success: false,
			title: "Invoice tidak terhapus.",
			message:"Terjadi masalah saat menghubungi server."
		}
	},
	updateInvoiceStatus: {
		success: {
			success: true,
			title: "Invoice",
			message:"Berhasil mengupdate status invoice ke Pengiriman."
		},
		error: {
			success: false,
			title: "Gagal mengupdate status invoice.",
			message:"Terjadi masalah saat menghubungi server."
		}
	},
	sendAppExp: {
		success: {
			success: true,
			title: "Berhasil mengirim",
			message:"Terima kasih telah memberikan respon anda terkait layanan Silajue."
		},
		error: {
			success: false,
			title: "Gagal mengirim.",
			message:"Terjadi masalah saat menghubungi server."
		}
	},
	scanInvoice: {
		error: {
			success: false,
			title: "No. Invoice tidak terdeteksi.",
			message:"Silahkan coba refresh aplikasi anda. Atau silahkan menghubungi kami jika mengalami kendala."
		}
	},
	deleteProductFeedback: {
		success: {
			success: true,
			title: "Feedback",
			message:"Berhasil menghapus feedback produk."
		},
		error: {
			success: false,
			title: "Feedback tidak terhapus.",
			message:"Terjadi masalah saat menghubungi server."
		}
	},
	addProductFeedback: {
		success: {
			success: true,
			title: "Feedback",
			message:"Terima kasih atas tanggapan anda terhadap produk kami."
		},
		error: {
			success: false,
			title: "Feedback tidak terkirim.",
			message:"Terjadi masalah saat menghubungi server."
		}
	},
	updateProfile: {
		success: {
			success: true,
			title: "Profil",
			message:"Berhasil memperbarui profil."
		},
		error: {
			success: false,
			title: "Gagal memperbarui Profil.",
			message:"Terjadi masalah saat menghubungi server."
		}
	},
	updatePassword: {
		success: {
			success: true,
			title: "Password",
			message:"Berhasil memperbarui Password."
		},
		error: {
			success: false,
			title: "Gagal memperbarui Password.",
			message:"Terjadi masalah saat menghubungi server."
		}
	},
	updateSocial: {
		success: {
			success: true,
			title: "Media Sosial",
			message:"Berhasil memperbarui data Media Sosial."
		},
		error: {
			success: false,
			title: "Gagal memperbarui Media Sosial.",
			message:"Terjadi masalah saat menghubungi server."
		}
	}
};

export default toastContent;