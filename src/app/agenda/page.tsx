export default function Agenda() {
  const events = [
    {
      id: 1,
      title: 'Clubavond',
      date: 'Elke dinsdag',
      time: '19:00 - 23:00',
      location: 'Hasseltsestraat 123, Hasselt',
      description: 'Wekelijkse clubavond voor leden en bezoekers. Iedereen welkom!',
    },
    {
      id: 2,
      title: "Kampioenschap O'Kelly",
      date: '15 april 2026',
      time: '14:00 - 18:00',
      location: 'Hasseltsestraat 123, Hasselt',
      description: 'Jaarlijks clubkampioenschap. Inschrijven via contact.',
    },
    {
      id: 3,
      title: 'Schaakweekend Limburg',
      date: '22-23 mei 2026',
      time: 'Gehele dag',
      location: 'CC De Muze, Hasselt',
      description: 'Toernooielement voor alle leeftijden. Meer info volgt.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="mx-auto w-5/6">
        <h1 className="mb-8 text-4xl font-bold text-[#1e293b]">Agenda</h1>
        
        <div className="space-y-6">
          {events.map((event) => (
            <div key={event.id} className="rounded-lg bg-white p-6 shadow-md">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="mb-2 text-2xl font-bold text-[#1e293b]">{event.title}</h2>
                  <p className="mb-2 text-gray-600">{event.description}</p>
                </div>
                <div className="mt-4 md:mt-0 md:ml-8 md:min-w-[200px]">
                  <p className="font-bold text-[#c4a77d]">{event.date}</p>
                  <p className="text-sm text-gray-600">{event.time}</p>
                  <p className="text-sm text-gray-600">{event.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}