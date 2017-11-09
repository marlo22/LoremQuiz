import React from "react";
import PropTypes from "prop-types";

//Components
import SectionHeader from "./SectionHeader.jsx";
import Main from "./Main.jsx";
import HelpItem from "./HelpItem.jsx";

const Help = () => {
  return (
    <div className="inner">
      <SectionHeader title="Pomoc" />
      <Main className="help">
        <HelpItem title="Jakie są zasady gry?">
          <p>
            Gra polega na udzielaniu odpowiedzi na zadane pytanie i zdobyciu jak największej liczby punktów procentowych. Z każdym następnym poziomem wzrasta trudność pytań, zmieniają się
            zasady punktowania i zwiększa się dostępny czas na udzielenie odpowiedzi. Poniższa tabela przedstawia szczegółowe dane dla każdego z poziomów:
          </p>
          <table className="table" style={{width: "300px", margin: "0 auto"}}>
            <thead>
              <tr>
                <th>Poziom</th>
                <th>Poprawna odp.</th>
                <th>Czas na odp.</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>10 pkt.</td>
                <td>20</td>
              </tr>
              <tr>
                <td>2</td>
                <td>20 pkt.</td>
                <td>30</td>
              </tr>
              <tr>
                <td>3</td>
                <td>30 pkt.</td>
                <td>60</td>
              </tr>
              <tr>
                <td>4</td>
                <td>40 pkt.</td>
                <td>60</td>
              </tr>
              <tr>
                <td>5</td>
                <td>50 pkt.</td>
                <td>n/a</td>
              </tr>
            </tbody>
          </table>
          <p>
            Zwróć uwagę, że aby uzyskać wynik 100% (czyli 750 pkt.) należy poprawnie odpowiedzieć na wszystkie pytania i dodatkowo nie skorzystać z żadnej pomocy.
          </p>
        </HelpItem>
        <HelpItem title="Co to jest „Tryb oszusta”">
          <p>
            Tryb oszusta pozwala na „kredytowanie” podpowiedzi, czyli kupowanie ich, nawet wtedy, kiedy saldo konta wynosi 0.
            Wyniki uzyskane w tym trybie nie są uwzględniane w rankingu najlepszych graczy.
          </p>
        </HelpItem>
        <HelpItem title="Czemu zresetowały się wszystkie moje ustawienia?">
          <p>
            Prawdopodobnie dlatego, że wyczyściłeś/aś dane przeglądarki. Wszystkie Twoje ustawienia są przechowywane w tzw. localStorage.
            Jest to technologia, która pozwala na zapisywanie prostych danych tekstowych, coś w stylu ciasteczek, tylko z trochę większymi możliwościami.
          </p>
        </HelpItem>
        <HelpItem title="Czy mogę dodawać własne pytania">
          <p>
            Oczywiście, że tak! Przygotowałem specjalną stronę, za pomocą której możesz dodawać swoje własne pytania.
            Wystarczy, że przejdziesz pod <a href="http://www.marlo.c0.pl/QuestionManager/" className="ext-link">ten</a> adres, a tam znajdziesz wszystkie szczegóły.
          </p>
        </HelpItem>
        <HelpItem title="Co zawierają raporty błędów wysyłane przez LoremQuiz?">
          <p>
            Raporty te nie zawierają żadnych Twoich osobistych danych.
            W ich skład wchodzi jedynie data i godzina wystąpienia błędu, nazwa pliku i dokładne miejsce w którym wystąpił błąd, rodzaj, treść i kod błędu.
            Wysyłanie raportów domyślnie jest wyłączone, ale zachęcam Cię, do korzystania z tej opcji. Ciebie to nic nie kosztuje, a mi pomoże w pracy nad udoskonalaniem gry.
          </p>
        </HelpItem>
        <HelpItem title="Znalazłem błąd w grze, gdzie powinienem to zgłosić?">
          <p>
            Będę Ci bardzo wdzięczny jeśli dasz znać na maila - marcin.1993@poczta.fm.
          </p>
        </HelpItem>
      </Main>
    </div>
  )
}

export default Help;
