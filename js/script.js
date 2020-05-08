// let evenements = [{
//     "title":"Live Coding - démo",
//     "start":"2019-11-23 14:00:00",
//     "end":"2019-11-23 16:00:00"},
// {
//     "title":"Live Coding - démo",
//     "start":"2019-11-30 14:00:00",
//     "end":"2019-11-30 16:00:00"
// }];

window.onload = () => {
    // On va chercher la div dans le HTML
    let elementCalendrier = document.getElementById('calendrier');

let xmlhttp = new HXMLHttpRequest()

xmlhttp.onreadystatechange = () => {
if(xmlhttp.readyState == 4){
    if(xmlhttp.status == 200){
        let evenements = JSON.parse(xmlhttp.responseText)


        // On instancie le calendrier
        let calendrier = new FullCalendar.Calendar(elementCalendrier, {
            // On charge le composant "dayGrid"
            plugins: [ 'dayGrid','timeGrid', 'list','interaction'],
            defaultView: 'timeGridWeek',
            locale: 'fr',
            header: {
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,dayGridWeek,listMonth'
            },
            buttonText: {
        today:    'Aujourd\'hui',
        month:    'Mois',
        week:     'Semaine',
        day:      'Jour',
        list:     'Liste'
      },
      events: evenements,
      nowIndicator: true,
      editable: true,
      evenDrop: (infos) =>{
        if(!confirm("Etes vous sûr.e de vouloir déplacer cet évènement")){
          infos.revert();
        }
      },
      eventResize: (infos) =>{
          console.log(infos.event.end )
      }
    })

        // On affiche le calendrier
        calendrier.render();
    }
  }
}



xmlhttp.open('get','http://calendrier.test/liste.php', true)
xmlhttp.send(null)

}
