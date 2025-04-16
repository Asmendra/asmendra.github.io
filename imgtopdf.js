document.getElementById('convertButton').addEventListener('click', function() {
    const input = document.getElementById('imageInput');
    const files = input.files;

    if (files.length === 0) {
        alert('Please select at least one image file.');
        return;
    }

    const pdf = new jsPDF();

    Array.from(files).forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imgData = e.target.result;
            pdf.addImage(imgData, 'JPEG', 10, 10, 180, 160); // Adjust dimensions as needed
            if (index < files.length - 1) {
                pdf.addPage();
            } else {
                const pdfOutput = pdf.output('blob');
                const downloadLink = document.getElementById('downloadLink');
                downloadLink.href = URL.createObjectURL(pdfOutput);
                downloadLink.download = 'converted.pdf';
                downloadLink.style.display = 'block';
                downloadLink.innerText = 'Download PDF';
            }
        };
        reader.readAsDataURL(file);
    });
});