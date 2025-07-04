let totalBelanja = 0;
const totalDiv = document.createElement("div");
totalDiv.style.marginTop = "30px";
totalDiv.style.padding = "10px";
totalDiv.style.backgroundColor = "#f0f0f0";
totalDiv.style.border = "1px solid #ccc";
totalDiv.style.borderRadius = "8px";
totalDiv.style.fontWeight = "bold";
totalDiv.textContent = "Total Belanja: Rp0";

const keranjangDiv = document.createElement("div");
keranjangDiv.style.marginTop = "30px";
keranjangDiv.innerHTML = "<h2>🛒 Keranjang:</h2><ul id='keranjang-list'></ul>";

document.body.appendChild(keranjangDiv);
document.body.appendChild(totalDiv);

const keranjangList = document.getElementById("keranjang-list");

document.querySelectorAll(".produk-card").forEach(function (card) {
    const btn = document.createElement("button");
    btn.textContent = "Tambah ke Keranjang";
    btn.style.marginTop = "10px";
    btn.style.padding = "6px 10px";
    btn.style.backgroundColor = "#007bff";
    btn.style.color = "white";
    btn.style.border = "none";
    btn.style.borderRadius = "6px";
    btn.style.cursor = "pointer";
    card.appendChild(btn);

    card.style.opacity = 0;
    setTimeout(() => {
        card.style.transition = "all 0.6s ease-in-out";
        card.style.opacity = 1;
    }, 100);

    btn.addEventListener("click", function () {
        const nama = card.querySelector(".nama-produk").textContent;
        const harga = card.querySelector(".harga-produk").textContent;
        alert(`🛒 ${nama} telah ditambahkan ke keranjang!\nHarga: ${harga}`);
        tambahKeKeranjang(nama, harga);
    });
});

function tambahKeKeranjang(nama, hargaString) {
    const angka = parseInt(hargaString.replace(/Rp|\.|,/g, ""));
    totalBelanja += angka;
    updateTotal();

    const item = document.createElement("li");
    item.textContent = `${nama} - Rp${angka.toLocaleString("id-ID")}`;

    const hapusBtn = document.createElement("button");
    hapusBtn.textContent = "🗑 Hapus";
    hapusBtn.style.marginLeft = "10px";
    hapusBtn.style.background = "#dc3545";
    hapusBtn.style.color = "white";
    hapusBtn.style.border = "none";
    hapusBtn.style.padding = "4px 8px";
    hapusBtn.style.borderRadius = "5px";
    hapusBtn.style.cursor = "pointer";

    hapusBtn.addEventListener("click", () => {
        keranjangList.removeChild(item);
        totalBelanja -= angka;
        updateTotal();
    });

    item.appendChild(hapusBtn);
    keranjangList.appendChild(item);
}
function updateTotal() {
    totalDiv.textContent = "Total Belanja: Rp" + totalBelanja.toLocaleString("id-ID");
}

const input = document.createElement("input");
input.type = "text";
input.placeholder = "🔍 Cari produk...";
input.style.margin = "20px 0";
input.style.padding = "10px";
input.style.border = "1px solid #ccc";
input.style.borderRadius = "6px";
input.style.width = "100%";
document.body.insertBefore(input, document.querySelector("h1"));

input.addEventListener("input", function () {
    const keyword = input.value.toLowerCase();
    document.querySelectorAll(".produk-card").forEach(function (card) {
        const nama = card.querySelector(".nama-produk").textContent.toLowerCase();
        card.style.display = nama.includes(keyword) ? "block" : "none";
    });
});
