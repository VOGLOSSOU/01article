document.getElementById('downloadPdf').addEventListener('click', function () {
    var element = document.querySelector('.container');

    // Appliquer les styles d'impression temporairement
    element.classList.add('print');

    html2canvas(element, { scale: 2 }).then(function (canvas) {
        var imgData = canvas.toDataURL('image/png');
        var doc = new jspdf.jsPDF('p', 'mm', 'a4');
        
        var imgWidth = 210; // Largeur de l'image dans le PDF (correspond à la largeur A4 en mm)
        var pageHeight = 297; // Hauteur de la page A4 en mm
        var imgHeight = canvas.height * imgWidth / canvas.width; // Calculer la hauteur de l'image pour garder les proportions

        // Si l'image est plus grande que la page, la redimensionner pour tenir sur une seule page
        if (imgHeight > pageHeight) {
            imgHeight = pageHeight;
        }

        // Ajouter l'image redimensionnée sur une seule page
        doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

        // Enregistrer le fichier PDF
        doc.save('article.pdf');
        
        // Retirer les styles d'impression après la génération
        element.classList.remove('print');
    });
});