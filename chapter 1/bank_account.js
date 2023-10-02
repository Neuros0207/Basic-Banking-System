// deklarasi variabel diawal kode yang nantinya dapat digunakan dan diubah saat pemanggilan fungsi
let saldo = 0 
let input_saldo = 0
let counter = 0
let jenistransaksi= ''
let list_transaksi = []
let waktu = new Date()
const resultsaldo = document.getElementById("resultsaldo")
const formatIDR = new Intl.NumberFormat( 'id',{
    style: 'currency',
    currency: 'IDR',
});
let formatwaktu = waktu.toLocaleTimeString('en',{
    hour12: false,
})
let transaksi = function(x){
    saldo_baru = saldo
    
    if(x == 'penyetoran saldo'){
        jenistransaksi = 'penyetoran saldo'
        input_saldo = window.prompt('Masukkan jumlah saldo yang akan disetor')
        saldo_baru += Number(input_saldo)
    }
    if(x == 'penarikan saldo'){
        jenistransaksi = 'penarikan saldo'
        input_saldo = window.prompt('Masukkan jumlah saldo yang akan diambil')
        saldo_baru -= Number(input_saldo)
    }
    input_saldo = Number(input_saldo) 
}

// fungsi tambah saldo yang tidak memerlukan parameter awal
let tambahsaldo= function(){
// saldo_baru mengambil nilai dari variabel saldo yang terbaru
    transaksi('penyetoran saldo')
// dengan menggunakan DOM yang mencari atribut id 'resultsaldo' di file html dan assign nilai ini akan ditempatkan sesuai innerHTML
    if(input_saldo<=0){resultsaldo.innerHTML = `Mohon Maaf nominal pengisian minimal adalah ${formatIDR.format(1)}`}
    else if(input_saldo >= 1){resultsaldo.innerHTML = `Saldo tabungan anda sekarang adalah ${formatIDR.format(saldo_baru)}`
// me-return variabel yang dibutuhkan untuk pemanggilan fungsi selanjutnya (nilai variabel saldo akan diupdate dengan 
// nilai variabel saldo_baru)
        myinputlist.pussh()
        return saldo_baru, saldo= saldo_baru, jenistransaksi, input_saldo} 
    else{resultsaldo.innerHTML = `Input nominal transaksi anda salah!`}
}
let kurangsaldo= function(){
    transaksi('penarikan saldo')
// melakukan conditional statement dengan kondisi:
// 1. jika saldo_baru (nilai saldo setelah penarikan/pengurangan saldo) kurang dari 0 maka akan
// menampilkan ke browser bahwa saldo pengguna tidak mencukupi
    
    if(saldo_baru < 0){
        resultsaldo.innerHTML = `Mohon Maaf saldo anda tidak cukup`
    }
    else if(input_saldo<=0){
        resultsaldo.innerHTML = `Mohon Maaf nominal penarikan minimal adalah ${formatIDR.format(1)}`}
// 2. jika saldo_baru masih tersisa atau bernilai 0, transaksi penarikan saldo akan dilanjutkan
    else if(saldo_baru >= 0){
        resultsaldo.innerHTML = `Saldo tabungan anda sekarang adalah ${formatIDR.format(saldo_baru)}`
        myinputlist.pussh()
        return saldo_baru, saldo= saldo_baru ,jenistransaksi,input_saldo
    } 
    else{
        resultsaldo.innerHTML = `Input nominal transaksi anda salah!` 
        }
}
// fungsi reset nilai saldo kembali ke 0
let reset_saldo = ()=>{
    saldo = 0
    resultsaldo.innerHTML = `Saldo tabungan telah di-reset` 
}

class inputlist{
    constructor(Jenis_Transaksi,Waktu_Transaksi,Besar_Transaksi){
        this.Jenis_Transaksi= Jenis_Transaksi
        this.Waktu_Transaksi= Waktu_Transaksi
        this.Besar_Transaksi= Besar_Transaksi
    }
    pussh(){
        waktu = new Date()
        formatwaktu= waktu.toLocaleTimeString('en',{
            hour12: false,
        })
        return list_transaksi.push({
        Jenis_Transaksi : jenistransaksi,
        Waktu_Transaksi : formatwaktu,
        Besar_Transaksi : formatIDR.format(input_saldo)
    })

    }
    
}
const myinputlist = new inputlist(jenistransaksi,formatwaktu,formatIDR.format(input_saldo))

// fungsi untuk menampilkan riwayat transaksi yang telah dilakukan pengguna
// dalam bentuk paragraf
function tambahelement (){

    let riwayatdefault = document.getElementById('riwayat')
    if(counter > 0){
        riwayatdefault.innerHTML = ''
        riwayatdefault.innerHTML = `
        <tr>
        <th>No.</th>
        <th>Jenis Transaksi</th>
        <th>Nilai Transaksi</th>
        <th>Waktu Transaksi</th>
        </tr>`
    }
    counter = 0
    for(let i = 0; i<=list_transaksi.length-1;++i){
        let table = document.getElementById('riwayat')
        let tablerow = table.insertRow(i+1)
        let tablecell1 = tablerow.insertCell(0)
        let tablecell2 = tablerow.insertCell(1)
        let tablecell3 = tablerow.insertCell(2)
        let tablecell4 = tablerow.insertCell(3)
        tablecell1.innerHTML= `${i+1}`
        tablecell2.innerHTML= `${list_transaksi[i].Jenis_Transaksi}`
        tablecell3.innerHTML= `${list_transaksi[i].Besar_Transaksi}`
        tablecell4.innerHTML= `${list_transaksi[i].Waktu_Transaksi}`
        ++counter
    }
    

}


