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
