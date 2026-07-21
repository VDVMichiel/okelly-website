export default function Footer() {
  return (
    <footer className="bg-[#5E5E5E] py-10 text-white">
      <div className="mx-auto grid w-5/6 grid-cols-1 gap-8 md:grid-cols-3">
        <div>
          <h3 className="mb-4 text-lg font-bold text-left">Schaakclub O'Kelly</h3>
          <p className="text-sm text-gray-300">
            Kom gezellig schaken bij onze club in België.<br />
            Beginners en gevorderden zijn welkom!
          </p>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-bold text-left">Contact</h3>
          <p className="text-sm text-gray-300">
            De Kermeta<br />
            Diestersteenweg 204<br />
            3510 Kermt (Hasselt)<br />
            <a href="mailto:schaakclubokelly@gmail.com" className="hover:text-[#c4a77d]">schaakclubokelly@gmail.com</a>
          </p>
          <a 
            href="https://www.google.com/maps/place/Kermeta/@50.9473594,5.2548192,106m/data=!3m1!1e3!4m6!3m5!1s0x47c1233cbacacadd:0xd72ce91c6b91fb09!8m2!3d50.9473393!4d5.2551022!16s%2Fg%2F1thw5wlj"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-300 hover:text-[#c4a77d] mt-2 inline-block"
          >
            Bekijk op Google Maps →
          </a>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-bold text-left">Links</h3>
          <div className="flex flex-col gap-2 text-sm text-gray-300">
            <a href="#nieuws" className="hover:text-[#c4a77d]">Nieuws</a>
            <a href="#agenda" className="hover:text-[#c4a77d]">Agenda</a>
            <a href="#overons" className="hover:text-[#c4a77d]">Over Ons</a>
            <a href="#contact" className="hover:text-[#c4a77d]">Contact</a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-8 w-5/6 border-t border-gray-600 pt-8 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Schaakclub O'Kelly. Alle rechten voorbehouden.
      </div>
    </footer>
  );
}
