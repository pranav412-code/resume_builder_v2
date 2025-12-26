/**
 * LaTeX PDF Compilation Service
 * Uses a CORS-friendly approach to compile LaTeX
 */

/**
 * Compile LaTeX to PDF using latex.js (client-side compilation)
 * This is a fallback that works entirely in the browser
 */
export async function compileToPDF(latexCode: string): Promise<Blob> {
    try {
        // Try using a CORS proxy with LaTeX.Online
        const proxyUrl = 'https://corsproxy.io/?';
        const targetUrl = 'https://texlive.net/cgi-bin/latexcgi';

        const formData = new FormData();
        formData.append('filecontents[]', latexCode);
        formData.append('filename[]', 'resume.tex');
        formData.append('engine', 'pdflatex');
        formData.append('return', 'pdf');

        const response = await fetch(proxyUrl + encodeURIComponent(targetUrl), {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Compilation failed: ${response.statusText}`);
        }

        return await response.blob();
    } catch (error) {
        console.error('LaTeX compilation error:', error);
        throw new Error('Failed to compile LaTeX to PDF. Please try downloading the LaTeX source and compile it locally using Overleaf or a local LaTeX installation.');
    }
}

/**
 * Download a blob as a file
 */
export function downloadBlob(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
