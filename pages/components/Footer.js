import Link from "next/link"

function FOOTER() {
  return (
    <footer>
      <div className="up impr">
      <a href="mailto:kontakt@nachhaltig-in-marktschwaben.de">Kontakt</a>
				<a href="mailto:kontakt@nachhaltig-in-marktschwaben.de">Datenschutz</a>
				<a href="mailto:kontakt@nachhaltig-in-marktschwaben.de">Impressum</a>
        {/* <Link href={" "}>
          <a>Kontakt</a>
        </Link>
        <Link href={" "}>
          <a>Datenschutz</a>
        </Link>
        <Link href={"mailto:kontakt@nachhaltig-in-marktschwaben.de"}>
          <a>Impressum</a>
        </Link> */}
      </div>
    </footer>
  )
}
export default FOOTER
