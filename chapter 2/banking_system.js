// deklarasi variabel diawal kode yang nantinya dapat digunakan dan diubah saat pemanggilan fungsi
let saldo = 0 
let input_saldo = 0
let counter = 0
let jenistransaksi= ''
let list_transaksi = []
let waktu = new Date()
let saldo_baru = 0
const resultsaldo = document.getElementById("resultsaldo")
const formatIDR = new Intl.NumberFormat( 'id',{
    style: 'currency',
    currency: 'IDR',
});
let formatwaktu = waktu.toLocaleTimeString('en',{
    hour12: false,
})

class BankAccount{
    constructor(jenistransaksi){
        this.jenistransaksi= jenistransaksi
    }
    deposit(){
        saldo_baru = saldo
        input_saldo = Number(window.prompt('Masukkan jumlah saldo yang akan disetor'))
      
        saldo_baru += Number(input_saldo)
        error_handling(this.jenistransaksi)
    }
    withdraw(){
        saldo_baru = saldo
        input_saldo = window.prompt('Masukkan jumlah saldo yang akan ditarik')
        saldo_baru -= Number(input_saldo)
        error_handling(this.jenistransaksi)
    }
    updateDaftarRiwayat(){
        waktu = new Date()
        formatwaktu= waktu.toLocaleTimeString('en',{
            hour12: false,
        })
        return list_transaksi.push({
        Jenis_Transaksi : this.jenistransaksi,
        Waktu_Transaksi : formatwaktu,
        Besar_Transaksi : formatIDR.format(input_saldo)
    })
    }

}
function updateElementDaftarRiwayat(){
    document.getElementById("loading-image").setAttribute("style","display:none")
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
        ++counter}}
function timeOUT(){
    document.getElementById("loading-image").setAttribute("style","display:block")
    setTimeout(updateElementDaftarRiwayat, 400)
    }
function error_handling(jenistransaksi){
    try {
        if(jenistransaksi === 'Penyetoran saldo'){
            if(input_saldo<=0) throw new Error(`Mohon Maaf nominal pengisian minimal adalah ${formatIDR.format(1)}`)
            else if(input_saldo >= 1 && (typeof saldo_baru === 'number')){
                saldo = saldo_baru
                resultsaldo.innerHTML = `Saldo tabungan anda sekarang adalah ${formatIDR.format(saldo)}`
                setor.updateDaftarRiwayat()
            }
            else {
                
                throw new Error(`Input nominal transaksi anda salah!`) 
            }
        }
        if(jenistransaksi === 'Penarikan saldo'){
            if(saldo_baru < 0){
                saldo_baru += input_saldo
                throw new Error(`Mohon Maaf saldo anda tidak cukup`) 
            }
            else if(input_saldo<=0){
                throw new Error(`Mohon Maaf nominal penarikan minimal adalah ${formatIDR.format(1)}`)}
            else if(saldo_baru >= 0 && (typeof saldo_baru === 'number')){
                saldo = saldo_baru
                resultsaldo.innerHTML = `Saldo tabungan anda sekarang adalah ${formatIDR.format(saldo)}`
                tarik.updateDaftarRiwayat()
            } 
            else throw new Error(`Input nominal transaksi anda salah!`)
        }
        
    }catch (err) {
        resultsaldo.innerHTML = err
    }}


const setor = new BankAccount('Penyetoran saldo')
const tarik = new BankAccount('Penarikan saldo')


