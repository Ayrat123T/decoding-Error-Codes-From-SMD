const singlePhaseMeterBlock = document.getElementById('SinglePhaseMeter');
const threePhaseMeterBlock = document.getElementById('ThreePhaseMeter');
const threePhaseMeterCheckBox = document.getElementById('ThreePhaseMeterCheckBox');

const currentTransformerTransformationRatio = document.getElementById('CurrentTransformerTransformationRatio');
const powerFactor = document.getElementById('PowerFactor');
const voltageMeterCheck = document.getElementById('VoltageMeterCheck');
const currentMeterCheck = document.getElementById('CurrentMeterCheck');
const voltageMeterCheck_B = document.getElementById('VoltageMeterCheck_B');
const currentMeterCheck_B = document.getElementById('CurrentMeterCheck_B');
const voltageMeterCheck_C = document.getElementById('VoltageMeterCheck_C');
const currentMeterCheck_C = document.getElementById('CurrentMeterCheck_C');
const impsMeterCheck = document.getElementById('ImpsMeterCheck');
const impNumMeterCheck = document.getElementById('ImpNumMeterCheck');

threePhaseMeterCheckBox.addEventListener("click", () => {
    if (threePhaseMeterCheckBox.checked) {
        threePhaseMeterBlock.style["display"] = "";
        document.getElementById('FirstVoltageMeterLabel').innerText = 'Ua[В] = ';
        document.getElementById('FirstCurrentMeterLabel').innerText = 'Ia[А] = ';
    } else {
        threePhaseMeterBlock.style["display"] = "none";
        document.getElementById('FirstVoltageMeterLabel').innerText = 'U[В] = ';
        document.getElementById('FirstCurrentMeterLabel').innerText = 'I[А] = ';
    }
});

const StartMeterCheckBtn = document.getElementById('StartMeterCheck');
StartMeterCheckBtn.addEventListener('click', startMeterCheck);

function CheckAllInputs() {
    if (impNumMeterCheck.value != '' && impsMeterCheck.value != '' &&
        voltageMeterCheck.value != '' && currentMeterCheck.value != '' &&
        currentTransformerTransformationRatio.value >= 0 && powerFactor.value >= 0 &&
        currentTransformerTransformationRatio.value != '' && powerFactor.value != '' &&
            (!threePhaseMeterCheckBox.checked ||
            (voltageMeterCheck_B.value != '' && currentMeterCheck_B.value != '' &&
            voltageMeterCheck_C.value != '' && currentMeterCheck_C.value != ''))) {
                return true;
            }
            return false;
}

function startMeterCheck(e) {
    if (CheckAllInputs()) {
        e.preventDefault();
        if (StartMeterCheckBtn.innerText == 'Старт▶') {
            if (currentTransformerTransformationRatio.value <= 0) {
                alert('Ктт не должен быть равен 0');
            } else if (powerFactor.value == 0) {
                alert('cos(φ) не должен быть равен 0');
            } else {
                seconds = 0.0;
                minutes = 0;
                hours = 0;
                energy = 0.0;
                interval = setInterval(updateTimeAndEnergy, 100);
                StartMeterCheckBtn.innerText = 'Стоп⛔️';
                StartMeterCheckBtn.style["background-color"] = "red";
                document.getElementById('resultMeterCheck').style["display"] = "none";
            }
        } else {
            clearInterval(interval);
            StartMeterCheckBtn.innerText = 'Старт▶';
            StartMeterCheckBtn.style["background-color"] = "#77dd77";
            calcMeterAccuracyAndShowRes(e);
        }
    }
}

let timer = document.getElementById('timer');
let resetBtn = document.getElementById('resetMeterCheck');
let calcEnergy = document.getElementById('CalcEnergy');
let calcPower = document.getElementById('CalcPower');
let power;
let seconds = 0.0;
let minutes = 0;
let hours = 0;
let energy = 0.0;
let interval;

function updateTimeAndEnergy() {
    seconds += 0.1;
    if (seconds >= 60.0) {
        minutes++;
        seconds = 0.0;
    }
    if (minutes == 60) {
        hours++;
        minutes = 0;
    }
    timer.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toFixed(1).toString().padStart(2, '0')}`;
    updatePower();
    updateEnergy();
}

function updatePower() {
    power = voltageMeterCheck.value * currentMeterCheck.value;
    if (threePhaseMeterCheckBox.checked) {
        power += voltageMeterCheck_B.value * currentMeterCheck_B.value + 
        voltageMeterCheck_C.value * currentMeterCheck_C.value;
    }
    power *= currentTransformerTransformationRatio.value * powerFactor.value;
    calcPower.textContent = 'Pрасч = ' +  power.toFixed(1).toString() + ' Вт;  ';
}

function updateEnergy() {
    energy += power / 1000 * (hours + minutes / 60 + seconds / 3600);
    calcEnergy.textContent = 'Wрасч = ' +  energy.toFixed(1).toString() + ' кВт*ч';
}

resetBtn.addEventListener('click', () => {
    clearInterval(interval);
    seconds = 0.0;
    minutes = 0;
    hours = 0;
    power = 0.0;
    calcPower.textContent = 'Pрасч = ' +  power.toFixed(1).toString() + ' Вт;  ';
    energy = 0.0;
    calcEnergy.textContent ='Wрасч = ' +  energy.toFixed(1).toString() + ' кВт*ч';
    timer.textContent = '00:00:00.0';
    StartMeterCheckBtn.innerText = 'Старт▶';
    StartMeterCheckBtn.style["background-color"] = "#77dd77";
    document.getElementById('resultMeterCheck').style["display"] = "none";
});

//const calcMeterAccuracyBtn = document.MeterCheck.CalcMeterAccuracy;
//calcMeterAccuracyBtn.addEventListener('click', calcMeterAccuracyAndShowRes);
powerFactor.addEventListener("change", calcMeterAccuracy);
currentTransformerTransformationRatio.addEventListener("change", calcMeterAccuracy);
voltageMeterCheck.addEventListener("change", calcMeterAccuracy);
currentMeterCheck.addEventListener("change", calcMeterAccuracy);
voltageMeterCheck_B.addEventListener("change", calcMeterAccuracy);
currentMeterCheck_B.addEventListener("change", calcMeterAccuracy);
voltageMeterCheck_C.addEventListener("change", calcMeterAccuracy);
currentMeterCheck_C.addEventListener("change", calcMeterAccuracy);
impsMeterCheck.addEventListener("change", calcMeterAccuracy);
impNumMeterCheck.addEventListener("change", calcMeterAccuracy);

function calcMeterAccuracy(e) {
    updatePower();
    const realPower = impNumMeterCheck.value / impsMeterCheck.value / (hours + minutes / 60 + seconds / 3600) * 1000;
    const accuracy = (power - realPower) / power * 100;
    document.getElementById('RealMeterPower').textContent = 'Pфакт = ' + realPower.toFixed(1).toString() + ' Вт;';
    document.getElementById('MeterAccuracy').textContent = 'Погрешность = ' + accuracy.toFixed(1).toString() + ' %';
}

function calcMeterAccuracyAndShowRes(e) {
    /*if (seconds == 0.0 && minutes == 0 && hours == 0.0) {
        alert('Нажмите \"Старт\"');
    }*/
    if (voltageMeterCheck.value != '' && currentMeterCheck.value != '' && impNumMeterCheck.value != '' && impsMeterCheck.value != '') {
        if (!threePhaseMeterCheckBox.checked ||
            (voltageMeterCheck_B.value != '' && currentMeterCheck_B.value != '' && voltageMeterCheck_C.value != '' && currentMeterCheck_C.value != '')) {
            e.preventDefault();
            document.getElementById('resultMeterCheck').style["display"] = "";
        }
    }
    clearInterval(interval);
    StartMeterCheckBtn.innerText = 'Старт▶';
    StartMeterCheckBtn.style["background-color"] = "#77dd77";
    calcMeterAccuracy(e);
}

function clearALL() {
    threePhaseMeterBlock.style["display"] = "none";
    document.getElementById('FirstVoltageMeterLabel').innerText = 'U[В] = ';
    document.getElementById('FirstCurrentMeterLabel').innerText = 'I[А] = ';
}

const writeBtn = document.getElementById("copyResultButton");
writeBtn.addEventListener("click", copyResult);

function copyResult(e) {
    e.preventDefault();
    /*//для десктопов
    const writeBtn = document.getElementById('buttonId');
    const inputEl = document.querySelector('.output');
    const inputValue = inputEl.innerText;
    if (inputValue) {
        navigator.clipboard.writeText(inputValue)
        .then(() => {
            if (writeBtn.innerText !== 'Скопировано!') {
            const originalText = writeBtn.innerText;
            writeBtn.innerText = 'Скопировано!';
            setTimeout(() => {
                writeBtn.innerText = originalText;
            }, 1500);
            }
        })
        .catch(err => {
            console.log('Something went wrong', err);
        })
    }*/
    var inp = document.createElement('input')
    
        var now = new Date();
        inp.value = now + ';    \n\r\
Номер ИПУ: ' + document.getElementById('SMDSerialNumMeterCheck').value + ';    \n\r\
Время: ' + timer.textContent + ';    \n\r\
Ктт = ' + currentTransformerTransformationRatio.value + ' о.е.;    \n\r'
+ (threePhaseMeterCheckBox.checked ? (
'Ua = ' + voltageMeterCheck.value.toString() + ' В;    \n\r\
Ia = ' + currentMeterCheck.value.toString() + ' A;    \n\r\
Ub = ' + voltageMeterCheck_B.value.toString() + ' В;    \n\r\
Ib = ' + currentMeterCheck_B.value.toString() + ' A;    \n\r\
Uc = ' + voltageMeterCheck_C.value.toString() + ' В;    \n\r\
Ic = ' + currentMeterCheck_C.value.toString() + ' A;    \n\r') : ('U = ' + voltageMeterCheck.value.toString() + ' В;    \n\r\
I = ' + currentMeterCheck.value.toString() + ' A;    \n\r'))
+ calcPower.textContent + '    \n\r'
+ calcEnergy.textContent + ';    \n\r\
A = ' + impsMeterCheck.value.toString() + ' имп/кВ*ч;   \n\r\
n = ' + impNumMeterCheck.value.toString() + ' имп;    \n\r'
+ document.getElementById('RealMeterPower').textContent + '    \n\r'
+ document.getElementById('MeterAccuracy').textContent;
    
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