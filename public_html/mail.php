<?php
//filtruje dane użytkownika
$mail = htmlspecialchars(trim($_POST['mail']));
$nr =  htmlspecialchars(trim($_POST['nr']));
$temat =  htmlspecialchars(trim($_POST['temat']));
$wiadomosc = htmlspecialchars(trim($_POST['tresc']));
$send = $_POST['send'];
//mail na który będa wysyłane wiadomości
$odbiorca = "biuro@grupaekoinstal.pl";
//nagłówki
$header = "Content-type: text/html; charset=utf-8\r\nFrom: $mail";

//Sprawdzam czy istnieje ciastko, jeżeli tak wyświetlam komunikat
//if (isset($_COOKIE['send'])) $error ='Odczekaj '.($_COOKIE['send']-time()).' sekund przed wysłaniem kolejnej wiadomości';   

if ($send && !isset($_COOKIE['send']))
    {    
    //Sprawdzam mail
    if (empty($mail))
        { $error .= "Nie wypełniłeś pola <strong>E-mail !</strong><br/>"; }
    elseif (strlen($mail) > 30)
        { $error .="Za długi e-mail - max. 30 znaków <br/>";}
    elseif (preg_match('/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9\-\_\.]+\@[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9\-\_\.]+\.[a-z]{2,4}$/',$mail) == false)
        { $error .= "Niepoprawny adres E-mail! <br/>"; }
        
    //Sprawdzam temat
    if (empty($temat))
        { $error .= "Nie wypełniłeś pola <strong>Temat !</strong><br/>"; }
    elseif (strlen($temat) > 120)
        { $error .="Za długi temat - max. 120 znaków <br/>";}
        
    //Sprawdzam wiadomosc
    if (empty($wiadomosc))
        { $error .= "Nie wypełniłeś pola <strong>Wiadomość !</strong><br/>"; }
    elseif (strlen($wiadomosc) > 400)
        { $error .="Za długa wiadomość - max. 400 znaków <br/>";}

    //Sprawdzam czy są błędy i wysyłam wiadomość
    if (empty($error))
        {
        $list = "Przysłał: $mail <br/> Nr kontaktowy: $nr <br/> Treść wiadomości: $wiadomosc";
        
        if (mail($odbiorca, $temat, $list, $header))   
        {
         $error .= "Twoja wiadomość została wysłana";
         setcookie("send", time()+60, time()+60);
         }
        else
            { $error .= "Wystąpił błąd podczas wysyłania wiadomości, spróbuj później.";}   
        }
    }
     echo "<script type=\"text/javascript\">
	   window.setTimeout(\"window.location.replace('index.html');\",0);
		</script>";
    
?>