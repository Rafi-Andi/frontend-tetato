import Swal from "sweetalert2"


function showConfirm(title, text, icon = 'warning', confirmText = 'Ya, Hapus!') {
    return Swal.fire({
        title: title,
        text: text,
        icon: icon,
        showCancelButton: true,
        confirmButtonColor: '#d9534f', 
        cancelButtonColor: '#d4a300',
        confirmButtonText: confirmText,
        cancelButtonText: 'Batal',
    })
}

export default showConfirm