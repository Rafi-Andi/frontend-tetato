import Swal from 'sweetalert2'

function showAlert(title, text, icon = 'info') {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonColor: '#d4a300',
    confirmButtonText: 'OK',
  })
}

export default showAlert
