import { MutableRefObject } from 'react'

export const handlePrint = (componentRef: MutableRefObject<HTMLDivElement>) => {
  const printWindow = window.open('', '_blank') as Window

  // Write the HTML content to the new window
  printWindow.document.write('<html><head><title>Print</title></head><body>')
  printWindow.document.write(componentRef.current.outerHTML)
  printWindow.document.write('</body></html>')

  // Wait for the content to load before printing
  printWindow.onload = () => {
    printWindow.print()
    printWindow.close()
  }

  printWindow.document.close()
}
