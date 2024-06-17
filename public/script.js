
function download()
{
    var pdfUrl ="./final-file.gz";
    var a = document.createElement('a');
    a.style.display = 'none';
    a.href = pdfUrl;
    a.download = `./final-file.gz`; 
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
} 