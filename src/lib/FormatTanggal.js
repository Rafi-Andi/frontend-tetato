export function formatTanggalIndonesia(tanggal) {
  const date = new Date(tanggal)
  const opsi = { day: 'numeric', month: 'long', year: 'numeric' }
  return date.toLocaleDateString('id-ID', opsi)
}
