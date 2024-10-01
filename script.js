// Pilih elemen input dan tombol berdasarkan ID FUNGSI BAGIAN SEARCHBAR
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

// Fungsi untuk mengalihkan ke halaman baru

function redirectToNewPage() {
    // Kamu bisa menambahkan logika di sini untuk menangani input pengguna, jika
    // dibutuhkan
    window.location.href = 'under-construction.html' // halaman baru yang akan di tuju
}

// Event listener untuk menangani tombol panah yang di klik

searchButton.addEventListener('click', function () {
    redirectToNewPage()
})

// Event listener untuk menangani enter pada input search
searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') { // Memeriksa jika tombol yang ditekan adalah "Enter"
        redirectToNewPage()
    }
})

// KUMPULAN FUNGSI BAGIAN SEARCHBAR SAMPAI SINI FUNGSI ANIMATED UNDER
// ___________________________________________________________________________________________

// Fungsi sticky header

const header = document.querySelector('header')

// Mendapatkan posisi awal header

const sticky = header.offsetTop

// Menambahkan event listener untuk medeteksi saat pengguna menggulir halaman
window.addEventListener('scroll', function() {
    // Jika halaman digulir lebih dari posisi awal header maka menambahkan class sticky
    if (this.window.scrollY > sticky) {
        header.classList.add('sticky');
    } else {
        // Jika pengguna kembali ke posisi awal, hapus class sticky
        header.classList.remove('sticky')
    }
})