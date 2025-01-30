function PrintResult(textResult) {
    /*const printBlock = document.getElementById("printBlock"); // получаем элемент printBlock
    const pElement = document.createElement("p"); // создаем новый параграф
    pElement.textContent = textResult; // устанавливаем у него текст
    printBlock.appendChild(pElement); // добавляем параграф в printBlock*/
    
    const list = document.querySelector('.output');
    const template = document.querySelector('#templatePrintBlock');

    // Клонируем содержимое тега <template>
    const item = template.content.cloneNode(true);

    // Находим тег <li> и помещаем текст внутрь
    item.querySelector('li').textContent = textResult;

    // Вставляем склонированный контент на страницу
    list.append(item);

}

function showMeterProp() {
    if (modelName.value == "incotex") {
        document.getElementById("incotexProp").style["display"] = "";
    } else {
        document.getElementById("incotexProp").style["display"] = "none";
    }
}

let brandToModelName = [ {ModelName: "incotex", brand: "Меркурий"},
                         {ModelName: "Iskraemeco", brand: "Iskraemeco"} ];

const getbrandByModelName = (array, ModelName) => {
    if (array) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].ModelName == ModelName) {
                return array[i];
            }
        }
    }
    return null;
};

function PrintIncotexMeterSeries() {
    let SelectedIncotexMeterSeries = document.ModelDecoding.incotexMeterSeries.options[document.ModelDecoding.incotexMeterSeries.selectedIndex].value;
    switch (SelectedIncotexMeterSeries) {
        case '204':
            PrintResult("204 – однофазный счетчик для установки в помещении, в шкафу, в щитке");
            break;
        case '208':
            PrintResult("208 – однофазный счетчик для наружной установки");
            break;
        case '230':
            PrintResult("230 – трехфазный счетчик для установки в помещении, в шкафу, в щитке");
            break;
        case '234':
            PrintResult("234 – трехфазный счетчик для установки в помещении, в шкафу, в щитке");
            break;
        case '238':
            PrintResult("238 – трехфазный счетчик для наружной установки");
            break;
    }
};

function PrintNot230ModelInput() {
    PrintResult(getbrandByModelName(brandToModelName, modelName.value).brand + '-'
        + document.ModelDecoding.incotexMeterSeries.value + '-'
        + (document.ModelDecoding.Anot230.checked ? 'A' :'')
        + (document.ModelDecoding.Rnot230.checked ? 'R' :'')
        + (document.ModelDecoding.Tnot230.checked ? 'T' :'')
        + (document.ModelDecoding.Mnot230.checked ? 'M' :'')
        + (document.ModelDecoding.Xnot230.checked ? 'X' :'')
        + (document.ModelDecoding.TOnot230.checked ? '2' :'') + '-0'
        + document.ModelDecoding.incotexNot230Denomination.options[document.ModelDecoding.incotexNot230Denomination.selectedIndex].value + '-'
        
        + (document.ModelDecoding.Dnot230.checked ? 'D' :'')
        + (document.ModelDecoding.Pnot230.checked ? 'P' :'')
        + (document.ModelDecoding.Onot230.checked ? 'O' :'')
        + (document.ModelDecoding.Knot230.checked ? 'K' + document.ModelDecoding.ModNumber.options[document.ModelDecoding.ModNumber.selectedIndex].value:'')
        + (document.ModelDecoding.Bnot230.checked ? 'B' :'')
        + (document.ModelDecoding.Hnot230.checked ? 'H' :'')
        + (document.ModelDecoding.Wnot230.checked ? 'W' :'')+ '-'

        + (document.ModelDecoding.RSnot230.checked ? 'R' :'')
        + (document.ModelDecoding.Lnot230.checked ? 'L' + document.ModelDecoding.PLSstandart.options[document.ModelDecoding.PLSstandart.selectedIndex].value:'')
        + (document.ModelDecoding.Gnot230.checked ? 'G' :'')
        + (document.ModelDecoding.MobileStandart.options[document.ModelDecoding.MobileStandart.selectedIndex].value != '0' ? document.ModelDecoding.MobileStandart.options[document.ModelDecoding.MobileStandart.selectedIndex].value : '')
        + (document.ModelDecoding.enot230.checked ? 'e' :'')
        + (document.ModelDecoding.snot230.checked ? 's' :'')
        + (document.ModelDecoding.Enot230.checked ? 'E' :'')
        + (document.ModelDecoding.Fnot230.checked ? 'F' + document.ModelDecoding.RFstandart.options[document.ModelDecoding.RFstandart.selectedIndex].value:'')
        + (document.ModelDecoding.Cnot230.checked ? 'C' :'')
        + (document.ModelDecoding.Qnot230multi.checked ? 'Q' + document.ModelDecoding.MultiModNums.options[document.ModelDecoding.MultiModNums.selectedIndex].value:'')
    );
};

function PrintNot230ModeldecodeResult() {
    PrintNot230ModelInput();
    PrintIncotexMeterSeries();
    PrintResult(document.ModelDecoding.Anot230.checked ? 'A – учет активной энергии' :'');
    PrintResult(document.ModelDecoding.Rnot230.checked ? 'R – учет реактивной энергии' :'');
    PrintResult(document.ModelDecoding.Tnot230.checked ? 'T – встроенный тарификатор' :'');
    PrintResult(document.ModelDecoding.Mnot230.checked ? 'М – наличие отсека для сменного модуля' :'');
    PrintResult(document.ModelDecoding.Xnot230.checked ? 'Х – улучшенный корпус' :'');
    PrintResult(document.ModelDecoding.TOnot230.checked ? '2 – двунаправленный' : 'однонаправленный');
    let SelectedIncotexMeterSeries = document.ModelDecoding.incotexMeterSeries.options[document.ModelDecoding.incotexMeterSeries.selectedIndex].value;
    let SelectedIncotexNot230Denomination = document.ModelDecoding.incotexNot230Denomination.options[document.ModelDecoding.incotexNot230Denomination.selectedIndex].value;
    switch(SelectedIncotexNot230Denomination) {
        case '0':
            PrintResult("счетчик трансформаторного включения");
            PrintResult(SelectedIncotexNot230Denomination + ' – '
            + "Номинальный ток - 5 A, максимальный ток - 10 A");
            PrintResult(SelectedIncotexMeterSeries[1] == 3? "Номинальное напряжение - 3×57,7 В, максимальное напряжение - 100 В" : '');
            PrintResult("Класс точности при измерении активной энергии - 0,2S или 0,5S, реактивной энергии - 0,5 или 1,0");
            break;
        case '1':
            PrintResult("счетчик прямого включения");
            PrintResult(SelectedIncotexNot230Denomination + ' – '
            + "Номинальный ток - 5 A, максимальный ток - 60 A");
            PrintResult(SelectedIncotexMeterSeries[1] == 3? "Номинальное напряжение - 3×230 В, максимальное напряжение - 400 В" : "Номинальное напряжение - 230 В");
            PrintResult("Класс точности при измерении активной энергии - 0,5 или 1, реактивной энергии - 1 или 2");
            break;
        case '2':
            PrintResult("счетчик прямого включения");
            PrintResult(SelectedIncotexNot230Denomination + ' – '
            + "Номинальный ток - 5 A, максимальный ток - 100 A");
            PrintResult(SelectedIncotexMeterSeries[1] == 3? "Номинальное напряжение - 3×230 В, максимальное напряжение - 400 В" : "Номинальное напряжение - 230 В");
            PrintResult("Класс точности при измерении активной энергии - 0,5 или 1, реактивной энергии - 1 или 2");
            break;
        case '3':
            PrintResult("счетчик трансформаторного включения");
            PrintResult(SelectedIncotexNot230Denomination + ' – '
            + "Номинальный ток - 5 A, максимальный ток - 10 A");
            PrintResult(SelectedIncotexMeterSeries[1] == 3? "Номинальное напряжение - 3×230 В, максимальное напряжение - 400 В" : '');
            PrintResult("Класс точности при измерении активной энергии - 0,2S или 0,5S, реактивной энергии - 0,5 или 1,0");
            break;
        case '4':
            PrintResult("счетчик трансформаторного включения");
            PrintResult(SelectedIncotexNot230Denomination + ' – '
            + "Номинальный ток - 1 A, максимальный ток - 10 A");
            PrintResult(SelectedIncotexMeterSeries[1] == 3? "Номинальное напряжение - 3×57,7 В, максимальное напряжение - 100 В" : '');
            PrintResult("Класс точности при измерении активной энергии - 0,2S или 0,5S, реактивной энергии - 0,5 или 1,0");
            break;
        case '5':
            PrintResult("счетчик трансформаторного включения");
            PrintResult(SelectedIncotexNot230Denomination + ' – '
            + "Номинальный ток - 1 A, максимальный ток - 10 A");
            PrintResult(SelectedIncotexMeterSeries[1] == 3? "Номинальное напряжение - 3×230 В, максимальное напряжение - 400 В" : '');
            PrintResult("Класс точности при измерении активной энергии - 0,2S или 0,5S, реактивной энергии - 0,5 или 1,0");
            break;
        case '6':
            PrintResult("счетчик трансформаторного включения");
            PrintResult(SelectedIncotexNot230Denomination + ' – '
            + "Номинальный ток - 1 A, максимальный ток - 2 A");
            PrintResult(SelectedIncotexMeterSeries[1] == 3? "Номинальное напряжение - 3×57,7 В, максимальное напряжение - 100 В" : '');
            PrintResult("Класс точности при измерении активной энергии - 0,2S или 0,5S, реактивной энергии - 0,5 или 1,0");
            break;
        case '7':
            PrintResult("счетчик трансформаторного включения");
            PrintResult(SelectedIncotexNot230Denomination + ' – '
            + "Номинальный ток - 1 A, максимальный ток - 2 A");
            PrintResult(SelectedIncotexMeterSeries[1] == 3? "Номинальное напряжение - 3×230 В, максимальное напряжение - 400 В" : '');
            PrintResult("Класс точности при измерении активной энергии - 0,2S или 0,5S, реактивной энергии - 0,5 или 1,0");
            break;
        case '8':
            PrintResult("счетчик прямого включения");
            PrintResult(SelectedIncotexNot230Denomination + ' – '
            + "Номинальный ток - 5 A, максимальный ток - 80 A");
            PrintResult(SelectedIncotexMeterSeries[1] == 3? "Номинальное напряжение - 3×230 В, максимальное напряжение - 400 В" : "Номинальное напряжение - 230 В");
            PrintResult("Класс точности при измерении активной энергии - 0,5 или 1, реактивной энергии - 1 или 2");
            break;
        case '9':
            PrintResult("счетчик прямого включения");
            PrintResult(SelectedIncotexNot230Denomination + ' – '
            + "Номинальный ток - 10 A, максимальный ток - 100 A");
            PrintResult(SelectedIncotexMeterSeries[1] == 3? "Номинальное напряжение - 3×230 В, максимальное напряжение - 400 В" : "Номинальное напряжение - 230 В");
            PrintResult("Класс точности при измерении активной энергии - 0,5 или 1, реактивной энергии - 1 или 2");
            break;
    }
    PrintResult(document.ModelDecoding.Dnot230.checked ? 'D – протокол СПОДЭС/DLMS' :'');
    PrintResult(document.ModelDecoding.Pnot230.checked ? 'P – расширенные программные функции' :'');
    PrintResult(document.ModelDecoding.Onot230.checked ? 'O – встроенное силовое реле отключения нагрузки' :'');
    PrintResult(document.ModelDecoding.Knot230.checked ? 'K – многофункциональные входы/выходы ' +  document.ModelDecoding.ModNumber.options[document.ModelDecoding.ModNumber.selectedIndex].value + "-й модификации" :'');
    
    PrintResult(document.ModelDecoding.Bnot230.checked ? 'B – подсветка ЖКИ' :'');
    PrintResult(document.ModelDecoding.Hnot230.checked ? 'H – наличие измерительного элемента в цепи нейтрали' :'');
    PrintResult(document.ModelDecoding.Wnot230.checked ? 'W – наличие выносного дисплея в комплекте поставки' :'');

    PrintResult(document.ModelDecoding.RSnot230.checked ? 'R – интерфейс RS485' :'');
    if (document.ModelDecoding.Lnot230.checked) {
        let SelectedPLSstandart = document.ModelDecoding.PLSstandart.options[document.ModelDecoding.PLSstandart.selectedIndex].value;
        switch(SelectedPLSstandart) {
            case '2':
                PrintResult('L' + SelectedPLSstandart + " – PLC II собственной разработки НПК «Инкотекс»");
                break;
            case '3':
                PrintResult('L' + SelectedPLSstandart + " – PLC Prime Alliance (международный стандарт)");
                break;
            case '4':
                PrintResult('L' + SelectedPLSstandart + " – PLC G3-PLC Alliance (международный стандарт)");
                break;
        }
    }
    if (document.ModelDecoding.Gnot230.checked) {
        let SelectedMobileStandart = document.ModelDecoding.MobileStandart.options[document.ModelDecoding.MobileStandart.selectedIndex].value;
        switch(SelectedMobileStandart) {
            case '0':
                PrintResult("G - GSM радиоинтерфейс");
                break;
            case '1':
                PrintResult('G' + SelectedMobileStandart + " – GSM/GPRS 2 SIM радиоинтерфейс");
                break; 
            case '3':
                PrintResult('G' + SelectedMobileStandart + " – UMTS 3G радиоинтерфейс");
                break; 
            case '4':
                PrintResult('G' + SelectedMobileStandart + " – LTE 4G радиоинтерфейс");
                break; 
            case '5':
                PrintResult('G' + SelectedMobileStandart + " – NBIOT радиоинтерфейс");
                break; 
            case '6':
                PrintResult('G' + SelectedMobileStandart + " – GSM/GPRS 1 SIM радиоинтерфейс");
                break;
            case '7':
                PrintResult('G' + SelectedMobileStandart + " – NBIOT/GPRS радиоинтерфейс");
                break;
        }
    }
    PrintResult(document.ModelDecoding.enot230.checked ? 'e – eSIM' :'');
    PrintResult(document.ModelDecoding.snot230.checked ? 's – SIMchip формата MFF2' :'');
    PrintResult(document.ModelDecoding.Enot230.checked ? 'E – Ethernet TX' :'');
    if (document.ModelDecoding.Fnot230.checked) {
        let SelectedRFstandart = document.ModelDecoding.RFstandart.options[document.ModelDecoding.RFstandart.selectedIndex].value;
        switch(SelectedRFstandart) {
            case '03':
                PrintResult('F' + SelectedRFstandart + " – RF радиоинтерфейс Zigbee");
                break; 
            case '04':
                PrintResult('F' + SelectedRFstandart + " – RF радиоинтерфейс LoRaWAN Лартех");
                break; 
            case '05':
                PrintResult('F' + SelectedRFstandart + " – RF радиоинтерфейс радиоканал технологии G3-PLC Hybrid диапазон 868 МГц");
                break; 
            case '06':
                PrintResult('F' + SelectedRFstandart + " – RF радиоинтерфейс Аура360");
                break; 
            case '07':
                PrintResult('F' + SelectedRFstandart + " – RF радиоинтерфейс LoRaWAN Вега");
                break;
            case '08':
                PrintResult('F' + SelectedRFstandart + "  – RF радиоинтерфейс Комета");
                break;
            case '09':
                PrintResult('F' + SelectedRFstandart + "  – RF радиоинтерфейс XNB");
                break;
            case '10':
                PrintResult('F' + SelectedRFstandart + "  – RF радиоинтерфейс OrionM2M");
                break;
        }
    }
    PrintResult(document.ModelDecoding.Cnot230.checked ? 'C – CAN' :'');
    if (document.ModelDecoding.Qnot230multi.checked) {
        let SelectedMultiModNums = document.ModelDecoding.MultiModNums.options[document.ModelDecoding.MultiModNums.selectedIndex].value;
        switch(SelectedMultiModNums) {
            case '1':
                PrintResult('Q' + SelectedMultiModNums + " – многофункциональный модуль");
                break; 
        }
    }
}

function Print230ModelInput() {
    PrintResult(getbrandByModelName(brandToModelName, modelName.value).brand + '-'
        + document.ModelDecoding.incotexMeterSeries.value + '-'
        + (document.ModelDecoding.A.checked ? 'A' :'')
        + (document.ModelDecoding.R.checked ? 'R' :'')
        + (document.ModelDecoding.T.checked ? 'T' :'')
        + (document.ModelDecoding.TO.checked ? '2' :'') + '-0'
        + document.ModelDecoding.incotexDenomination.options[document.ModelDecoding.incotexDenomination.selectedIndex].value + '-'
        + (document.ModelDecoding.F.checked ? 'F' :'')
        + (document.ModelDecoding.P.checked ? 'P' :'')
        + (document.ModelDecoding.Q.checked ? 'Q' :'') + '-'
        + (document.ModelDecoding.C.checked ? 'C' :'')
        + (document.ModelDecoding.R.checked ? 'R' :'')
        + (document.ModelDecoding.S.checked ? 'S' :'')
        + (document.ModelDecoding.I.checked ? 'I' :'')
        + (document.ModelDecoding.L.checked ? 'L' :'')
        + (document.ModelDecoding.G.checked ? 'G' :'') + '-'
        + (document.ModelDecoding.D.checked ? 'D' :'')
        + (document.ModelDecoding.N.checked ? 'N' :'')
        + (document.ModelDecoding.B.checked ? 'B' :'') + '\n\r');
}

function Print230ModeldecodeResult() {
    Print230ModelInput();
    PrintIncotexMeterSeries();
    PrintResult(document.ModelDecoding.A.checked ? 'A – учет активной энергии' :'');
    PrintResult(document.ModelDecoding.R.checked ? 'R – учет реактивной энергии' :'');
    PrintResult(document.ModelDecoding.T.checked ? 'T – встроенный тарификатор' :'');
    PrintResult(document.ModelDecoding.TO.checked ? '2 – двунаправленный' : 'однонаправленный');
    switch(document.ModelDecoding.incotexDenomination.options[document.ModelDecoding.incotexDenomination.selectedIndex].value) {
        case '0':
            PrintResult(document.ModelDecoding.incotexDenomination.options[document.ModelDecoding.incotexDenomination.selectedIndex].value + ' – '
            + "Номинальный ток - 5 A, базовый(максимальный) ток - 7,5 A");
            PrintResult("Номинальное напряжение - 3×57,7 В, максимальное напряжение - 100 В");
            PrintResult("Класс точности при измерении активной энергии - 0,5S, реактивной энергии - 1,0");
            break;
        case '1':
            PrintResult(document.ModelDecoding.incotexDenomination.options[document.ModelDecoding.incotexDenomination.selectedIndex].value + ' – '
            + "Номинальный ток - 5 A, базовый(максимальный) ток - 60 A");
            PrintResult("Номинальное напряжение - 3×230 В, максимальное напряжение - 400 В");
            PrintResult("Класс точности при измерении активной энергии - 1,0, реактивной энергии - 2,0");
            break;
        case '2':
            PrintResult(document.ModelDecoding.incotexDenomination.options[document.ModelDecoding.incotexDenomination.selectedIndex].value + ' – '
            + "Номинальный ток - 10 A, базовый(максимальный) ток - 100 A");
            PrintResult("\tНоминальное напряжение - 3×230 В, максимальное напряжение - 400 В");
            PrintResult("Класс точности при измерении активной энергии - 1,0, реактивной энергии - 2,0");
            break;
        case '3':
            PrintResult(document.ModelDecoding.incotexDenomination.options[document.ModelDecoding.incotexDenomination.selectedIndex].value + ' – '
            + "Номинальный ток - 5 A, базовый(максимальный) то - 7,5 A");
            PrintResult("Номинальное напряжение - 3×230 В, максимальное напряжение - 400 В");
            PrintResult("Класс точности при измерении активной энергии - 0,5S, реактивной энергии - 1,0");
            break;
    }
    PrintResult(document.ModelDecoding.F.checked ? 'F – наличие профиля, журнала событий, контроля максимумов мощности' :'');
    PrintResult(document.ModelDecoding.P.checked ? 'P – наличие профиля, журнала событий, контроля максимумов мощности и функции учета потерь':'');
    PrintResult(document.ModelDecoding.Q.checked ? 'Q – измерение основных показателей качества электроэнергии, CAN' :'');
    PrintResult(document.ModelDecoding.C.checked ? 'C – CAN' :'');
    PrintResult(document.ModelDecoding.RS.checked ? 'R – RS485' :'');
    PrintResult(document.ModelDecoding.S.checked ? 'S – встроенное питание RS485, CAN' :'');
    PrintResult(document.ModelDecoding.I.checked ? 'I – IRDA' :'');
    PrintResult(document.ModelDecoding.L.checked ? 'L – PLC I собственной разработки НПК «Инкотекс»' :'');
    PrintResult(document.ModelDecoding.G.checked ? 'G – GSM/GPRS' :'');
    PrintResult(document.ModelDecoding.D.checked ? 'D – возможность резервного питания' :'');
    PrintResult(document.ModelDecoding.N.checked ? 'N – наличие электронной пломбы' :'');
    PrintResult(document.ModelDecoding.B.checked ? 'B – подсветка ЖКИ' :'');
}

function decodMeterModel(e) {
    e.preventDefault();
    //document.getElementById("printBlock").innerHTML = "";
    document.querySelector('.output').innerHTML = "";
    if (modelName.value == "incotex") {
        document.ModelDecoding.incotexMeterSeries.value == '230' ? Print230ModeldecodeResult() : PrintNot230ModeldecodeResult();
    }
}

const decodModelBtn = document.getElementById('decodModel');
decodModelBtn.addEventListener("click", decodMeterModel);

function hideAll () {
    incotexMeterSeries.value = "230";
    //document.getElementById("printBlock").innerHTML = "";
    document.querySelector('.output').innerHTML = "";
    SwitchToIncotex230();
    btnСheckUncheckAll.innerText = '◻︎Отменить';
}

const modelName = document.getElementById("modelName");
modelName.addEventListener("change", showMeterProp);

function SwitchToIncotexNo230() {
    document.getElementById("incotex230Prop").style["display"] = "none";
    document.getElementById("incotexNot230Prop").style["display"] = "";
}

function SwitchToIncotex230() {
    document.getElementById("incotex230Prop").style["display"] = "";
    document.getElementById("incotexNot230Prop").style["display"] = "none";
}

function incotexMeterSeriesChange() {
    if (incotexMeterSeries.value != "230") {
        SwitchToIncotexNo230();
    } else {
        SwitchToIncotex230();
    }
}

const incotexMeterSeries = document.getElementById("incotexMeterSeries");
incotexMeterSeries.addEventListener("change", incotexMeterSeriesChange);

var btnСheckUncheckAll = document.getElementById('СheckUncheckAll');
btnСheckUncheckAll.addEventListener("click", checkUncheckAll);

function checkUncheckAll(e) {
    e.preventDefault();
    var container = document.getElementById('incotexProp');
    var inputs = container.getElementsByTagName('input');
    if (btnСheckUncheckAll.innerText == '☑︎Выбрать') {
        btnСheckUncheckAll.innerText = '◻︎Отменить';
        for(var i = 0, inputs_len = inputs.length; i < inputs_len; i++) {
            inputs[i].checked = true;
        }
    } else {
        btnСheckUncheckAll.innerText = '☑︎Выбрать';
        for(var i = 0, inputs_len = inputs.length; i < inputs_len; i++) {
            inputs[i].checked = false;
        }
    }
}

function clearALL() {
    //document.getElementById("printBlock").innerHTML = "";
    document.querySelector('.output').innerHTML = "";
}

const writeBtn = document.getElementById("copyResultButton");
writeBtn.addEventListener("click", copyResult);

function copyResult(e) {
    e.preventDefault();
    var inp = document.createElement('input')
    inp.value = document.querySelector('.output').innerText;
    document.body.appendChild(inp)
    inp.select()
    if (document.execCommand('copy')) {
        if (writeBtn.innerText !== 'Скопировано!') {
            const originalText = writeBtn.innerText;
            writeBtn.innerText = 'Скопировано!';
            setTimeout(() => {
                writeBtn.innerText = originalText;
            }, 1500);
        }
    } else {
        console.log("Failed...")
    }
    document.body.removeChild(inp)
}