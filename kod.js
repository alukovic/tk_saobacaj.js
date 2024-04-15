let odabirJSONniza = document.querySelector('#odabirJSONniza');
let ucitavanjeJSONniza = document.querySelector('#ucitavanjeJSONniza');

let opcijaPrikazNiza = document.querySelector('#opcijaPrikazNiza');
let opcijaNoviUnos = document.querySelector('#opcijaNoviUnos');

let prikazJSONniza = document.querySelector('#prikazJSONniza');
let brojJSONelemenata = document.querySelector('#brojJSONelemenata');

let opcijaNizSvihElemenata = document.querySelector('#opcijaNizSvihElemenata');

let celokupnaVremenskaSerija = document.querySelector('#celokupnaVremenskaSerija');
 brojElVrSerije = document.querySelector('#brojElVrSerije');

let opcijaNasumicnePodeleVrSerije = document.querySelector('#opcijaNasumicnePodeleVrSerije');
let nasumicneGrupeVremenskeSerije = document.querySelector('#nasumicneGrupeVremenskeSerije');

let brojPodnizova = document.querySelector('#brojPodnizova');


//////////////////////////////////
/////////////////////////////////
/////Proračun Hurstovog parametra
////////////////////////////////
///////////////////////////////

let proracunH = document.querySelector('#proracunH');
noviNiz = new Array();
noviNizlogn = new Array();
sortiraniNizlogn = new Array();

let zbirElVrSerije = document.querySelector('#zbirElVrSerije');
let srVrVrSerije = document.querySelector('#srVrVrSerije');
let brClanovaPodnizova = document.querySelector('#brClanovaPodnizova');
let zbirClanovaPodnizova = document.querySelector('#zbirClanovaPodnizova');
let srVrPodnizova = document.querySelector('#srVrPodnizova');
let kumulativneDevijacijePodnizova = document.querySelector('#kumulativneDevijacijePodnizova');
let Rpodnizova = document.querySelector('#Rpodnizova');
let Spodnizova = document.querySelector('#Spodnizova');
let RSodnosPodnizova = document.querySelector('#RSodnosPodnizova');
let logRSodnosPodnizova = document.querySelector('#logRSodnosPodnizova');
let RSusrednjavanje = document.querySelector('#RSusrednjavanje');
let najblize_s_za_logN = document.querySelector('#najblize_s_za_logN');
let logn_grupa = document.querySelector('#logn_grupa');
let logn_kv_grupa = document.querySelector('#logn_kv_grupa');

let vrednostHurstovogParametra = document.querySelector('#vrednostHurstovogParametra');

let RSgrafik = document.querySelector('#RSgrafik');
let vizGrafik = document.querySelector('#vizGrafik');

///////////
///////////

odabirJSONniza.addEventListener('change', () => {

    let files = odabirJSONniza.files;
    if(files.length == 0) return;

    const file = files[0];

    let reader = new FileReader();

    reader.onload = (e) => {

        const file = e.target.result;
        const lines = file.split(/\r\n|\n/);
        ucitavanjeJSONniza.value = lines.join('\n');

    };

    reader.onerror = (e) => alert(e.target.error.name);
    reader.readAsBinaryString(file);

});

opcijaNoviUnos.addEventListener('click', () => {
    window.location.reload(true);
});

opcijaPrikazNiza.addEventListener('click', () => {

    JSONniz = JSON.parse(ucitavanjeJSONniza.value);

    let i = 0;
    let el = '';
    let br = 0;

    for(i = 0; i < JSONniz.length; i++){
        el += JSONniz[i]['All Packets'] + '\n';
        br++;
    }

    prikazJSONniza.value = el;
    brojJSONelemenata.value = br;

});

opcijaNizSvihElemenata.addEventListener('click', () => {

    noviNiz = JSONniz.map(({'All Packets': vrednost}) => vrednost);
    celokupnaVremenskaSerija.value = noviNiz;
    brojElVrSerije.value = noviNiz.length;

});

opcijaNasumicnePodeleVrSerije.addEventListener('click', () => {

    brojPodnizova2 = 0;

        brElPodnizova = Number();
        brElPodnizovaTekst = '';
    
        zbirPodniza = 0;
        zbirPodnizaTekst = '';
    
        srVrPod = 0;
        srVrPodTekst = '';
    
        x1 = 0, x2 = 0, x3 = 0, x4 = 0;
        w1 = 0, w2 = 0, w3 = 0, w4 = 0;
        wTxt = '';
    
        maxVr = 0, minVr = 0, R = 0;
        opsegRtxt = '';
    
        S_ = 0, S = 0;
        vrStxt = ''; 
    
        RS = Number(), logRS = 0;
        vrRStxt = '';
        logRStxt = '';
    
        A = 0, usrednjavanje = Number(), usrednjavanjeA = 0, logN = 0, s = 0;
    
        logn = 0, logn_2 = 0;
        lognTxt = '';
        logn_2Txt = '';
    
        sumaLogn = Number(), sumaLogn_2 = Number(), sumaLogRS = Number(), sumaLognLogRS = 0;
    
        ceoNizLogn = [], nizSumaLogn = [], nizSumaLogn_2 = [];
    
        ceoNizSumaLogRSf = [];
    
        ceoNizLogRS = [], nizSumaLogRS = [];
    
        ceoNizSumaLognLogRS = [], nizSumaLognLogRS = [];
    
        vrLognLogRS = Number();
    
        H_ = Number();
        H = Number();
    
        /*1.6.2021. Nove promenljive */
        nizW = [], nizR = [], nizS = [], nizRS = [], nizLogRS = [], nizLogn = []; 
    
        /*2.6.2021. Nove promenljive */

        nizUsrednjavanje = [], nizUsrednjavanjeF = [];
        sumaUsrednjavanje = Number(), sumaUsrednjavanjeA = Number();
    
        /*3.6.2021. Nove promenljive i nizovi */
        fCeoNizLogn = [], fCeoNizLogRS = [], fCeoNizSumaLogRS = [], fCeoNizSumaLognLogRS = [];
        
        /*4.6.2021. Nove promenljive */
        filtriraniNiz = [], sortiraniNiz = [], sortiraniNizA = [];
        nizJedinstvenihElemenata = [];
    
        logRSsortiraniNiz = [], logRSnizJedinstvenihElemenata = [];
    
        lognSortiraniNiz = [], lognNizJedinstvenihElemenata = [];
    
        /*5.6.2021. Nove promenljive */
        vrNasumicnogBroja = Number();
    
        podnizR = new Array();
    
        nasumicniBroj = (min, max) => {
            return Math.random() * (max - min) + min;
        };
    
        brojTekst = '';
    
        function srVr(a, b, n){
            return Number(((a+b)/n).toFixed(2));
        }
        
        function uklanjanjeDuplikataElemenata(niz){
            const jedan = [];
            niz.forEach((value) => {
                if(!jedan.includes(value)){
                    jedan.push(value);
                }
            });
            return jedan;
        }
    
        while(noviNiz.length > 1){
    
            A++;
            //nasumicniBroj(2, 5); 
            vrNasumicnogBroja = Math.floor(nasumicniBroj(2, 5)); 
            brojPodnizova2++;
            //brojPodnizova2 = aca;
            podnizR = noviNiz.splice(0, vrNasumicnogBroja);
            //console.log(podnizR);
            brojTekst += podnizR + '\n';
            nasumicneGrupeVremenskeSerije.value = brojTekst;
    
            //Broj elemenata (članova) svakog podniza
            txtnPod = document.getElementById('txtnPod');
            //brElPodnizova = Math.floor(vrNasumicnogBroja);
    
            brElPodnizova = podnizR.length;
            brElPodnizovaTekst += brElPodnizova + '\n';
        
            //Zbir svakog podniza
            txtZbirPod = document.getElementById('txtZbirPod');
            zbirPodniza = podnizR.filter(x => x >= 0).reduce((x,y) => x + y, 0);
            zbirPodnizaTekst += zbirPodniza + '\n';
            //txtZbirPod.value = zbirPodnizovaTekst;
    
            //Srednja vrednost svakog podniza
            txtSrVrPod = document.getElementById('txtSrVrPod');
            srVrPod = Number((zbirPodniza / brElPodnizova).toFixed(2));
            srVrPodTekst += srVrPod + '\n';
    
            //Kumulativne devijacije svakog podniza
            wPod = Number();
            txtWpod = document.getElementById('txtWpod');
    
            //Opseg svake grupe
            //maxVr = 0, minVr = 0, Rn = 0;
            txtRpod = document.getElementById('txtRpod');
    
            //Standardna devijacija svake grupe
            txtSpod = document.getElementById('txtSpod');
    
            //R/S odnos svake grupe
            txtRSpod = document.getElementById('txtRSpod');
    
            //Logaritamski R/S odnos svake grupe
            txtLogRSpod = document.getElementById('txtLogRSpod');
    
            //Usrednjavanje R/S odnosa
            txtUsrednjavanje = document.getElementById('txtUsrednjavanje'); 
    
            //Najbliža celobrojna vrednost s za logN, gde je osnova logaritma 2
            txtNajCelVred = document.getElementById('txtNajCelVred');
    
            //Logaritamske vrednosti broja (n) elemenata grupa
            txtLogn = document.getElementById('txtLogn');
    
            //Kvadratne logaritamske vrednosti broja (n) elemenata grupa
            txtLogn_2 = document.getElementById('txtLogn_2');
            
            if(brElPodnizova === 2){
    
                //Proračun kumulativnih devijacija podnizova
    
                x1 = podnizR[0];
                x2 = podnizR[1];
    
                w1 = Number((x1 - srVrPod).toFixed(2));
                //w2 = Number((x1 + x2 - 2*srVrPod).toFixed(2));
                w2 = Number(Math.floor(Math.abs(x1 + x2 - 2*srVrPod)));
                
                wPod = `${w1} ${w2}`;
                wTxt += wPod + '\n';
                //console.log(w1, w2);
                
                //Smeštanje vrednosti kumulativnih devijacija w1 i w2 u nizove;
    
                //Proračun opsega svake grupe
                maxVr = Math.max(w1, w2);
                minVr = Math.min(w1, w2);
                R = maxVr - minVr;
    
                opsegRtxt += R + '\n';
    
                //Proračun standardne devijacije svake grupe
                S_ = Math.sqrt((1 / brElPodnizova)*((x1 - srVrPod)**2 + (x2 - srVrPod)**2));
                S = Number(S_.toFixed(2));
                
                vrStxt += S + '\n'; 
    
                //Proračun R/S opsega svake grupe
                RS = Number((R/S).toFixed(2));
    
                vrRStxt += RS + '\n';
    
                //Proračun logaritamskog R/S odnosa svake grupe
                logRS = Number((Math.log10(RS)).toFixed(2));
    
                logRStxt += logRS + '\n';
    
                //Proračun usrednjavanja v2
                nizUsrednjavanje.push(RS);
                //***nizUsrednjavanjeF = nizUsrednjavanje.filter(x => x >= 0);
             
                //Proračun za najbližu celobrojnu vrednost s za logN, gde je osnova logaritma 2
                /*8.6.2021. Uto. */
                //s = Math.floor(Math.log2(Na));
                //s = Math.ceil(Math.log2(Na));

                 /*9.6.2021. Sre. */
                 s_staro = Math.round(Math.log2(noviNiz.length));
                 s = Math.round(Math.log2(Number(brojElVrSerije.value)));

                //Progračun logaritamskih vrednosti broja (n) elemenata grupa
                logn = Number((Math.log10(brElPodnizova)).toFixed(2));
    
                lognTxt += logn + '\n';
    
                //Progračun kvadrata logaritamskih vrednosti broja (n) elemenata grupa
                logn_2 = Number((logn**2).toFixed(2));
                logn_2Txt += logn_2 + '\n';
    
                //Proračun suma potrebnih za određivanje Hurstovog parametra
    
                //Suma elemenata logn i logn*logn
    
                //Niz sastavljen od svih logn vrednosti
                ceoNizLogn.push(logn);
                //Filtriranje niza v3
                //**fCeoNizLogn = ceoNizLogn.filter(x => x >= 0);
    
                nizSumaLogn = ceoNizLogn.slice(0, s);
                sumaLogn = Number((nizSumaLogn.filter(x => x >= 0).reduce((x, y) => x + y, 0)).toFixed(2));
                nizSumaLogn_2 = nizSumaLogn.map(x => x*x);
                sumaLogn_2 = Number((nizSumaLogn_2.filter(x => x >= 0).reduce((x, y) => x + y, 0)).toFixed(2));
    
                //Suma elemenata logRS
    
                //Niz sastavnjen od svih logRS vrednosti
                ceoNizLogRS.push(logRS);
                //Filtriranje niza v3
                //+7.6.2021. 
                fCeoNizLogRS = ceoNizLogRS.filter(x => x >= 0);
                nizSumaLogRS = fCeoNizLogRS.slice(0, s);
    
                sumaLogRS = Number((nizSumaLogRS.filter(x => x >= 0).reduce((x, y) => x + y, 0)).toFixed(2));
    
                //Suma elemenata logn*logRS
                vrLognLogRS = Number((logn * logRS).toFixed(2));
                ceoNizSumaLognLogRS.push(vrLognLogRS);
                //Filtriranje niza v3
                //+7.6.2021. 
                fCeoNizSumaLognLogRS = ceoNizSumaLognLogRS.filter(x => x >= 0);
                nizSumaLognLogRS = fCeoNizSumaLognLogRS.slice(0, s);
                sumaLognLogRS = Number((nizSumaLognLogRS.filter(x => x >= 0).reduce((x, y) => x + y, 0)).toFixed(2));
    
                /* AAAA

                //Vrednosti potrebne za RS statistiku 
    
                //x - osa logn 
                //y - osa logRS
    
                //lognSortiraniNiz = [], lognNizJedinstvenihElemenata = [];
                lognSortiraniNiz = fCeoNizLogn.sort((x, y) => x - y);
                lognNizJedinstvenihElemenata = uklanjanjeDuplikataElemenata(lognSortiraniNiz);
    
                //logRSsortiraniNiz = [], logRSnizJedinstvenihElemenata = [];
                logRSsortiraniNiz = fCeoNizLogRS.sort((x, y) => x - y);
                logRSnizJedinstvenihElemenata = uklanjanjeDuplikataElemenata(logRSsortiraniNiz);

                */

            //lognSortiraniNiz = [], lognNizJedinstvenihElemenata = [];
            lognSortiraniNiz = fCeoNizLogn.sort((x, y) => x - y);
            lognNizJedinstvenihElemenata = uklanjanjeDuplikataElemenata(lognSortiraniNiz);

            //logRSsortiraniNiz = [], logRSnizJedinstvenihElemenata = [];
            logRSsortiraniNiz = fCeoNizLogRS.sort((x, y) => x - y);
            logRSnizJedinstvenihElemenata = uklanjanjeDuplikataElemenata(logRSsortiraniNiz);
                
            } else if (brElPodnizova === 3){
    
                x1 = podnizR[0];
                x2 = podnizR[1];
                x3 = podnizR[2];
    
                w1 = Number((x1 - srVrPod).toFixed(2));
                w2 = Number((x1 + x2 - 2*srVrPod).toFixed(2));
                //w3 = Number((x1 + x2 + x3 - 3*srVrPod).toFixed(2));
                w3 = Number(Math.floor(Math.abs(x1 + x2 + x3 - 3*srVrPod)));
    
                wPod = `${w1} ${w2} ${w3}`;
                wTxt +=  wPod + '\n';
                //console.log(w1, w2, w3);
                
                //Proračun opsega svake grupe
                maxVr = Math.max(w1, w2, w3);
                minVr = Math.min(w1, w2, w3);
                R = maxVr - minVr;
    
                opsegRtxt += R + '\n';
    
                //Proračun standardne devijacije svake grupe
                S_ = Math.sqrt((1 / brElPodnizova)*((x1 - srVrPod)**2 + (x2 - srVrPod)**2 + (x3 - srVrPod)**2));
                S = Number(S_.toFixed(2)); 
    
                vrStxt += S + '\n'; 
    
                //Proračun R/S opsega svake grupe
                RS = Number((R/S).toFixed(2));
    
                vrRStxt += RS + '\n';   
                
                //Proračun logaritamskog R/S odnosa svake grupe
                logRS = Number((Math.log10(RS)).toFixed(2));
    
                logRStxt += logRS + '\n'; 
    
                //Proračun usrednjavanja v2
                nizUsrednjavanje.push(RS);
                nizUsrednjavanjeF = nizUsrednjavanje.filter(x => x >= 0);
    
                //Proračun za najbližu celobrojnu vrednost s za logN, gde je osnova logaritma 2
                /*8.6.2021. Uto. */
                //s = Math.floor(Math.log2(Na));
                /*8.6.2021. Uto. */
                //s = Math.floor(Math.log2(Na));
                //s = Math.ceil(Math.log2(Na));

                 /*9.6.2021. Sre. */
                 s = Math.round(Math.log2(Number(brojElVrSerije.value)));
                 s_staro = Math.round(Math.log2(noviNiz.length));
                
                //Progračun logaritamskih vrednosti broja (n) elemenata grupa
                logn = Number((Math.log10(brElPodnizova)).toFixed(2));
    
                lognTxt += logn + '\n'; 
    
                //Progračun kvadrata logaritamskih vrednosti broja (n) elemenata grupa
                logn_2 = Number((logn**2).toFixed(2));
                logn_2Txt += logn_2 + '\n';
    
                //Proračun suma potrebnih za određivanje Hurstovog parametra
    
                //Suma elemenata logn i logn*logn
    
                //Niz sastavljen od svih logn vrednosti
                ceoNizLogn.push(logn);
                //Filtriranje niza v3
                //**fCeoNizLogn = ceoNizLogn.filter(x => x >= 0);
    
                nizSumaLogn = ceoNizLogn.slice(0, s);
                sumaLogn = Number((nizSumaLogn.filter(x => x >= 0).reduce((x, y) => x + y, 0)).toFixed(2));
                nizSumaLogn_2 = nizSumaLogn.map(x => x*x);
                sumaLogn_2 = Number((nizSumaLogn_2.filter(x => x >= 0).reduce((x, y) => x + y, 0)).toFixed(2));
    
                //Suma elemenata logRS
    
                //Niz sastavnjen od svih logRS vrednosti
                ceoNizLogRS.push(logRS);
                //Filtriranje niza v3
                //+7.6.2021. 
                fCeoNizLogRS = ceoNizLogRS.filter(x => x >= 0);
                nizSumaLogRS = fCeoNizLogRS.slice(0, s);
    
                sumaLogRS = Number((nizSumaLogRS.filter(x => x >= 0).reduce((x, y) => x + y, 0)).toFixed(2));
    
                //Suma elemenata logn*logRS
                vrLognLogRS = Number((logn * logRS).toFixed(2));
                ceoNizSumaLognLogRS.push(vrLognLogRS);
                //Filtriranje niza v3
                //+7.6.2021. 
                fCeoNizSumaLognLogRS = ceoNizSumaLognLogRS.filter(x => x >= 0);
                nizSumaLognLogRS = fCeoNizSumaLognLogRS.slice(0, s);
                sumaLognLogRS = Number((nizSumaLognLogRS.filter(x => x >= 0).reduce((x, y) => x + y, 0)).toFixed(2));
                
                /* AAAA

                //Vrednosti potrebne za RS statistiku 
    
                //x - osa logn 
                //y - osa logRS
    
                //logRSsortiraniNiz = [], logRSnizJedinstvenihElemenata = [];
    
                logRSsortiraniNiz = ceoNizLogRS.sort((x, y) => x - y);
                logRSnizJedinstvenihElemenata = uklanjanjeDuplikataElemenata(logRSsortiraniNiz);

                */

            //lognSortiraniNiz = [], lognNizJedinstvenihElemenata = [];
            lognSortiraniNiz = fCeoNizLogn.sort((x, y) => x - y);
            lognNizJedinstvenihElemenata = uklanjanjeDuplikataElemenata(lognSortiraniNiz);

            //logRSsortiraniNiz = [], logRSnizJedinstvenihElemenata = [];
            logRSsortiraniNiz = fCeoNizLogRS.sort((x, y) => x - y);
            logRSnizJedinstvenihElemenata = uklanjanjeDuplikataElemenata(logRSsortiraniNiz);
    
            } else if (brElPodnizova === 4){
    
                x1 = podnizR[0];
                x2 = podnizR[1];
                x3 = podnizR[2];
                x4 = podnizR[3];
    
                /*Kumulativne devijacije svakog podniza */
                w1 = Number((x1 - srVrPod).toFixed(2));
                w2 = Number((x1 + x2 - 2*srVrPod).toFixed(2));
                w3 = Number((x1 + x2 + x3 - 3*srVrPod).toFixed(2));
                w4 = Number(Math.floor(Math.abs(x1 + x2 + x3 + x4 - 4*srVrPod)));
    
                wPod = `${w1} ${w2} ${w3} ${w4}`;
                wTxt += wPod + '\n';
    
                //console.log(w1, w2, w3, w4);
    
                //Proračun opsega svake grupe
                maxVr = Math.max(w1, w2, w3, w4);
                minVr = Math.min(w1, w2, w3, w4);
                R = maxVr - minVr;
    
                opsegRtxt += R + '\n';
    
                //Proračun standardne devijacije svake grupe
                S_ = Math.sqrt((1 / brElPodnizova)*((x1 - srVrPod)**2 + (x2 - srVrPod)**2 + (x3 - srVrPod)**2 + (x4 - srVrPod)**2));
                S = Number(S_.toFixed(2)); 
    
                vrStxt += S + '\n'; 
    
                //Proračun R/S opsega svake grupe
                RS = Number((R/S).toFixed(2));
    
                vrRStxt += RS + '\n';
    
                //Proračun logaritamskog R/S odnosa svake grupe
                logRS = Number((Math.log10(RS)).toFixed(2));
    
                logRStxt += logRS + '\n'; 
    
                //Proračun usrednjavanja v2
                nizUsrednjavanje.push(RS);
                nizUsrednjavanjeF = nizUsrednjavanje.filter(x => x >= 0);
            
                //Proračun za najbližu celobrojnu vrednost s za logN, gde je osnova logaritma 2
                /*8.6.2021. Uto. */
                //s = Math.floor(Math.log2(Na));
                /*8.6.2021. Uto. */
                //s = Math.floor(Math.log2(Na));
                //s = Math.ceil(Math.log2(Na));

                 /*9.6.2021. Sre. */
                 s = Math.round(Math.log2(Number(brojElVrSerije.value)));
                 s_staro = Math.round(Math.log2(noviNiz.length));
                
                //Progračun logaritamskih vrednosti broja (n) elemenata grupa
                logn = Number((Math.log10(brElPodnizova)).toFixed(2));
    
                lognTxt += logn + '\n'; 
                
                //Progračun kvadrata logaritamskih vrednosti broja (n) elemenata grupa
                logn_2 = Number((logn**2).toFixed(2));
                logn_2Txt += logn_2 + '\n';
            
                //Proračun suma potrebnih za određivanje Hurstovog parametra
    
                //Suma elemenata logn i logn*logn
    
                //Niz sastavljen od svih logn vrednosti
                ceoNizLogn.push(logn);
                //Filtriranje niza v3
                //**fCeoNizLogn = ceoNizLogn.filter(x => x >= 0);
    
                nizSumaLogn = ceoNizLogn.slice(0, s);
                sumaLogn = Number((nizSumaLogn.filter(x => x >= 0).reduce((x, y) => x + y, 0)).toFixed(2));
                nizSumaLogn_2 = nizSumaLogn.map(x => x*x);
                sumaLogn_2 = Number((nizSumaLogn_2.filter(x => x >= 0).reduce((x, y) => x + y, 0)).toFixed(2));
    
                //Suma elemenata logRS
    
                //Niz sastavnjen od svih logRS vrednosti
                ceoNizLogRS.push(logRS);
                //Filtriranje niza v3
                //+7.6.2021. 
                fCeoNizLogRS = ceoNizLogRS.filter(x => x >= 0);
                nizSumaLogRS = fCeoNizLogRS.slice(0, s);
    
                sumaLogRS = Number((nizSumaLogRS.filter(x => x >= 0).reduce((x, y) => x + y, 0)).toFixed(2));
    
                //Suma elemenata logn*logRS
                vrLognLogRS = Number((logn * logRS).toFixed(2));
                ceoNizSumaLognLogRS.push(vrLognLogRS);
                //Filtriranje niza v3
                //+7.6.2021. 
                fCeoNizSumaLognLogRS = ceoNizSumaLognLogRS.filter(x => x >= 0);
                nizSumaLognLogRS = fCeoNizSumaLognLogRS.slice(0, s);
                sumaLognLogRS = Number((nizSumaLognLogRS.filter(x => x >= 0).reduce((x, y) => x + y, 0)).toFixed(2));
                
                /* AAAA

                //Vrednosti potrebne za RS statistiku 
    
                //x - osa logn 
                //y - osa logRS
    
                //logRSsortiraniNiz = [], logRSnizJedinstvenihElemenata = [];
    
                logRSsortiraniNiz = fCeoNizLogRS.sort((x, y) => x - y);
                logRSnizJedinstvenihElemenata = uklanjanjeDuplikataElemenata(logRSsortiraniNiz);  
                
                */

            //lognSortiraniNiz = [], lognNizJedinstvenihElemenata = [];
            lognSortiraniNiz = fCeoNizLogn.sort((x, y) => x - y);
            lognNizJedinstvenihElemenata = uklanjanjeDuplikataElemenata(lognSortiraniNiz);

            //logRSsortiraniNiz = [], logRSnizJedinstvenihElemenata = [];
            logRSsortiraniNiz = fCeoNizLogRS.sort((x, y) => x - y);
            logRSnizJedinstvenihElemenata = uklanjanjeDuplikataElemenata(logRSsortiraniNiz);
    
            } else
            {
            txtWpod.value = 'Pokušajte ponovo sa generisanjem podnizova...';
            }
            
            ////////////////////
            ////////////////////
            //Novo: 4.4.2024.//
            ///////////////////
            ///////////////////

            noviNizlogn.push(logn);
            sortiraniNizlogn = noviNizlogn.sort((x, y) => x - y);

        //console.log(N);
        //console.log(brojPodnizova2);
        console.log(noviNiz);
    
        brojPodnizova.value = brojPodnizova2;
    
        //Proračun usrednjavanja v1
    
        /*
        for(let i = 0; i <= N; i++){
    
            if(typeof(i) !== 'NaN'){
            usrednjavanje += RS; 
            usrednjavanjeA = Number((usrednjavanje / A).toFixed(2));
            }
    
        }
        */  
} 

});

proracunH.addEventListener('click', function(){

    /* Definisanje promenljivih: */

    /*Globalna promenljiva*/
    //let niz = JSON.parse(txtA.value);
    noviNiz = JSONniz.map(({'All Packets': element}) => element);

    //Ukupan broj elemenata  niza je: 
    Na = noviNiz.length;
    //txtN.value = Na;

    zbirVS = noviNiz.filter(a => a > 0).reduce((a, b) => a + b, 0);
    zbirElVrSerije.value = zbirVS;
    srVrVS = Number((zbirVS / Na).toFixed(2));
    srVrVrSerije.value = srVrVS;

    //console.log(brojPodnizova2);
    //Prikaz broja elemenata(članova) svakog podniza
    //brClanovaPodnizova.value = brojPodnizova2;
    brClanovaPodnizova.value = brElPodnizovaTekst;

    //console.log(nNizz);
    console.log(noviNiz);

    //Prikaz broja elemenata(članova) svakog podniza
    //txtnPod.value = brElPodnizovaTekst;

    //Prikaz zbira svakog podniza
    zbirClanovaPodnizova.value = zbirPodnizaTekst;

    //Prikaz srednje vrednosti svakog podniza;
    srVrPodnizova.value = srVrPodTekst;

    //Prikaz kumulativnih devijacija podnizova
    kumulativneDevijacijePodnizova.value = wTxt;

    //Prikaz opsega svake grupe
    Rpodnizova.value = opsegRtxt;

    //Prikaz standardne devijacije svake grupe
    Spodnizova.value = vrStxt; 

    //Prikaz R/S opsega svake grupe
    RSodnosPodnizova.value = vrRStxt;

    //Prikaz logaritamskog R/S opsega svake grupe
    logRSodnosPodnizova.value = logRStxt;

    //Usrednjavanje R/S odnosa
    sumaUsrednjavanje = Number((nizUsrednjavanjeF.filter(x => x >= 0).reduce((x, y) => x + y, 0)).toFixed(2));
    sumaUsrednjavanjeA = Number((sumaUsrednjavanje / A).toFixed(2));
    RSusrednjavanje.value = sumaUsrednjavanjeA;

    //Prikaz najbliže celobrojne vrednosti s za logN, gde je osnova logaritma 2
    najblize_s_za_logN.value = s;

    //Prikaz logaritamskih vrednosti broja (n) elemenata grupa
    logn_grupa.value = lognTxt; 

    //Prikaz kvadrata logaritamskih vrednosti broja (n) elemenata grupa
    logn_kv_grupa.value = logn_2Txt;

    //Hurstov parametar: 
    H_ = Number((s*sumaLognLogRS - sumaLogn*sumaLogRS)/(s*sumaLogn_2 - sumaLogn*sumaLogn));
    H = Number(H_.toFixed(2));

    //if(H >= 0 && H <= 1 && typeof(H) !== 'NaN'){
    if(H >=0.5 && H <=1 && typeof(H) !== 'NaN'){
    console.log(`Hurstov parametar je: ${H}`);
    vrednostHurstovogParametra.value = H;
    
    RSstatistika();
    vizuelizacijaSvihPodataka();

    } else {

        //vrednostHurstovogParametra.value = H;
        window.location.reload(true);
        console.log(`Desila se neuobičajena greška. Klikinite na dugme Obrisati i pokušajte ponovo. Neki od mogućih uzroka su pojava više NaN vrednosti ili semantičke greške u kodu.`);
        console.log(`Vrednost H parametra je:  ${H}`);

        /*
        infoHtxt.innerHTML = `
        Desila se neuobičajena greška pri izračunavanju H parametra. 
        </br>
        Hurstov parametar je: ${H}
        </br>1
        </br>
        Program ima dosta NaN vrednosti, pa je i rezultat NaN.
        </br>
        One nastaju ako su svi elementi podniza sastavljena od nula.
        </br>
        Tako je R = 0; S = 0, a odnos R/S = 0/0, tj. vrednost je NaN.
        </br>
        <b>Bolja opcija je filtriranje niza. </br>
        `;
        */

        console.log('Pozdrav, JSON niz je: ', JSONniz);
        console.log('Pozdrav, noviNiz je: ', noviNiz);
        console.log('Pozdrav, celokupna vremenska serija je: ', celokupnaVremenskaSerija.value);
        console.log('Pozrav, s je: ', s);

    }

   console.log(`sumaLognLogRS: ${sumaLognLogRS}`);
   console.log(`sumaLogn: ${sumaLogn}`);
   console.log(`sumaLogRS: ${sumaLogRS}`);
   console.log(`sumaLogn_2: ${sumaLogn_2}`);

   console.log(nizJedinstvenihElemenata); 
   console.log(`x - osa: ${lognNizJedinstvenihElemenata}`);
   console.log(`y - osa: ${logRSnizJedinstvenihElemenata}`);

   console.log(`nizSumaLogn: ${nizSumaLogn}`);
   console.log(`SumaLogn: ${sumaLogn}`);
   console.log(`nizSumaLogn_2: ${nizSumaLogn_2}`);
   console.log(`sumaLogn_2: ${sumaLogn_2}`);

   console.log('Hurstov parametar je: ', H);

   //
   console.log('Pozdrav, lognSortiraniNiz je:', lognSortiraniNiz);
   console.log('Pozdrav, logRSsortiraniNiz je: ', logRSsortiraniNiz);
   console.log('Pozdrav, logn je: ', logn);
   console.log('Pozdrav, lognTxt je: ', parseInt(lognTxt));
   console.log('Pozdrav, noviNizlogn je: ', noviNizlogn);
   console.log('Pozdrav, sortiraniNizlogn je: ', sortiraniNizlogn);
   
});

function RSstatistika(){

    /*
    infoTxtV.innerHTML = `
    x - osa: logn 
    <br/> 
    y - osa: logRS`;
    */

    RSgraf = RSgrafik.getContext('2d');
    RSstat = new Chart(RSgraf, {
        type: 'line',
        data: {
            labels: sortiraniNizlogn, //lognSortiraniNiz*, //lognSortiraniNiz, //ceoNizLogn, testAniz
            datasets: [{
                label: 'Vrednost',
                data: logRSsortiraniNiz,//nizS, //logRSsortiraniNiz, //logRSsortiraniNiz, //ceoNizLogRS
                backgroundColor: [
                    //'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 1)',
                    //'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    //'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    //'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    //'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    //'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {

                y: {
                    beginAtZero: true,
                    display: true
                },
                x: {
                    beginAtZero: true,
                    display: true
                }
            }

        }
    });  

}

function vizuelizacijaSvihPodataka(){

    /*
    infoTxtV.innerHTML = `
    x - osa: logn 
    </br> 
    y - osa: logRS`;
    */

    vizGraf = vizGrafik.getContext('2d');
    
    vizuelizacijaPodataka = new Chart(vizGraf, {
        type: 'line',
        data: {
            labels: ceoNizLogn, //ceoNizLogn, testAniz
            datasets: [{
                label: 'Vrednost',
                data: ceoNizLogRS, //ceoNizLogRS
                backgroundColor: [
                    //'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 1)',
                    // 'rgba(255, 206, 86, 0.2)', 
                    'rgba(75, 192, 192, 0.2)',
                    //'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    // 'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    // 'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    //'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

}
