// CONSTRUCTION Array yang menyimpan titik titik yang dianimasikan bentuk
// deklarasi variable dalam 1 baris Array untuk menyimpan titik-titik yang akan
// dianimasikan
var points = [],
    velocity2 = 5, // Kecepatan yang sudah dikuadratkan (vx^2 + vy^2 = velocity2)
    canvas = document.getElementById('container'), // Elemen canvas tempat animasi akan digambar
    context = canvas.getContext('2d'), // Mendapatkan context 2D untuk menggambar di canvas
    radius = 5, // Radius lingkaran yang akan digambar
    boundaryX = 200, // Batas horizontal untuk gerakan titik
    boundaryY = 200, // Batas vertikal untuk gerakan titik
    numberOfPoints = 30; // Jumlah titik yang akan dibuat

// Inisialisasi awal program
init();

function init() {
    // Buat titik sebanyak numberOfPoints
    for (var i = 0; i < numberOfPoints; i++) {
        createPoint();
    }

    // Hubungkan setiap titik dengan titik tetangganya (membuat garis)
    for (var i = 0, l = points.length; i < l; i++) {
        var point = points[i];
        if (i == 0) {
            points[i].buddy = points[points.length - 1]; // Titik pertama terhubung ke titik terakhir
        } else {
            points[i].buddy = points[i - 1]; // Titik lainnya terhubung ke titik sebelumnya
        }
    }

    // Mulai animasi
    animate();
}

// Fungsi untuk membuat titik baru dengan kecepatan acak
function createPoint() {
    var point = {},
        vx2,
        vy2;
    point.x = Math.random() * boundaryX; // Posisi acak di dalam batas horizontal
    point.y = Math.random() * boundaryY; // Posisi acak di dalam batas vertikal
    // Kecepatan horizontal (vx) diacak dengan arah -1 atau 1
    point.vx = (Math.floor(Math.random()) * 2 - 1) * Math.random();
    vx2 = Math.pow(point.vx, 2); // Kuadrat dari vx
    // Hitung vy menggunakan persamaan vy^2 = velocity2 - vx^2
    vy2 = velocity2 - vx2;
    point.vy = Math.sqrt(vy2) * (Math.random() * 2 - 1); // Hitung vy dengan arah acak (-1 atau 1)
    points.push(point); // Masukkan titik yang baru dibuat ke dalam array points
}

// Fungsi untuk mengatur ulang kecepatan titik jika menyentuh batas
function resetVelocity(point, axis, dir) {
    var vx2,
        vy2;
    if (axis == 'x') {
        // Reset kecepatan horizontal (vx)
        point.vx = dir * Math.random();
        vx2 = Math.pow(point.vx, 2);
        vy2 = velocity2 - vx2;
        point.vy = Math.sqrt(vy2) * (Math.random() * 2 - 1); // Hitung ulang vy berdasarkan vx baru
    } else {
        // Reset kecepatan vertikal (vy)
        point.vy = dir * Math.random();
        vy2 = Math.pow(point.vy, 2);
        vx2 = velocity2 - vy2;
        point.vx = Math.sqrt(vx2) * (Math.random() * 2 - 1); // Hitung ulang vx berdasarkan vy baru
    }
}

// Fungsi untuk menggambar lingkaran pada posisi titik
function drawCircle(x, y) {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false); // Menggambar lingkaran dengan radius tertentu
    context.fillStyle = '#4C5FD5'; // Warna lingkaran
    context.fill(); // Mengisi lingkaran dengan warna
}

// Fungsi untuk menggambar garis antara dua titik
function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1); // Mulai garis dari titik pertama
    context.lineTo(x2, y2); // Menghubungkan ke titik kedua
    context.strokeStyle = '#4C5FD5'; // Warna garis
    context.stroke(); // Menggambar garis
}

// Fungsi untuk menggambar semua titik dan garis pada canvas
function draw() {
    for (var i = 0, l = points.length; i < l; i++) {
        var point = points[i];
        // Update posisi titik berdasarkan kecepatan (vx dan vy)
        point.x += point.vx;
        point.y += point.vy;

        // Gambar lingkaran pada posisi titik baru
        drawCircle(point.x, point.y);

        // Gambar garis yang menghubungkan titik ke titik "buddy"-nya
        drawLine(point.x, point.y, point.buddy.x, point.buddy.y);

        // Cek apakah titik menyentuh batas kanvas, dan reset kecepatannya jika iya
        if (point.x < 0 + radius) {
            resetVelocity(point, 'x', 1); // Jika menyentuh batas kiri, arahkan ke kanan
        } else if (point.x > boundaryX - radius) {
            resetVelocity(point, 'x', -1); // Jika menyentuh batas kanan, arahkan ke kiri
        } else if (point.y < 0 + radius) {
            resetVelocity(point, 'y', 1); // Jika menyentuh batas atas, arahkan ke bawah
        } else if (point.y > boundaryY - radius) {
            resetVelocity(point, 'y', -1); // Jika menyentuh batas bawah, arahkan ke atas
        }
    }
}

// Fungsi untuk menjalankan animasi secara berulang
function animate() {
    // Membersihkan area canvas sebelum menggambar frame berikutnya
    context.clearRect(0, 0, 200, 200);
    draw(); // Gambar ulang semua titik dan garis
    // Permintaan untuk menjalankan frame animasi berikutnya
    requestAnimationFrame(animate);
}
