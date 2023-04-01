var mqtt;
var reconnectTimeout = 2000;
var host = "localhost";//change this
var port = 9001;

var valueNhipTim = null;
var benhnhan_name;
var benhnhan_age;
var benhnhan_address;
var benhnhan_gioitinh;

var ageIndex = null;
var ageValue = null;



function onFailure(message) { //hàm kết nối thất bại
    console.log("Kết nối máy chủ " + host + " THẤT BẠI");
    setTimeout(MQTTconnect, reconnectTimeout);
}
function onMessageArrived(msg) { // hàm nhan tin nhan
    if (msg.destinationName == "sensor") { // bắt msg từ topic sensor
        if (msg.payloadString >= 10) {
            document.getElementById("sensor_value-output").innerHTML = msg.payloadString;
            valueNhipTim = msg.payloadString;
        } else {
            document.getElementById("sensor_value-output").innerHTML = null;
        }
        ;
    }

}

function onConnect() { //hàm kết nối thành công
    console.log("Đã kết nối THÀNH CÔNG với máy chủ Broker!");
    mqtt.subscribe("sensor");
}

function MQTTconnect() { // hàm kết nối
    console.log("Đang kết nối tới " + host + " port: " + port);
    var x = Math.floor(Math.random() * 10000);
    var cname = "orderform-" + x;
    mqtt = new Paho.MQTT.Client(host, port, cname);
    var options = {
        timeout: 3,
        onSuccess: onConnect,
        onFailure: onFailure,
    };
    mqtt.onMessageArrived = onMessageArrived
    mqtt.connect(options); //connect
}

function publish(led_topic, led_data) { // hàm gửi tin nhắn
    pub_msg = new Paho.MQTT.Message(led_data);
    pub_msg.destinationName = led_topic;
    mqtt.send(pub_msg);
}



function luuthongtin() {
    const wrapper = document.querySelector('.wrapper');
    wrapper.classList.add('active');

    var name = document.getElementById("name-input").value;
    document.getElementById("name-output").innerHTML = name;

    document.getElementById("age-output").innerHTML = ageValue;

    var gioitinh = document.getElementById("gioitinh-input").value;
    document.getElementById("gioitinh-output").innerHTML = gioitinh;
    var address = document.getElementById("address-input").value;
    document.getElementById("address-output").innerHTML = address;

    benhnhan_name = name;
    benhnhan_age = ageValue;
    benhnhan_address = address;
    benhnhan_gioitinh = gioitinh;

    console.log("Đã lưu thông tin người bệnh!");

}

function quayveluuthongtin() {
    var name1 = document.getElementById("name-input").value;
    document.getElementById("name-output").innerHTML = name1;
    var age1 = document.getElementById("age-input").value;
    document.getElementById("age-output").innerHTML = age1;
    var gioitinh1 = document.getElementById("gioitinh-input").value;
    document.getElementById("gioitinh-output").innerHTML = gioitinh1;
    var address1 = document.getElementById("address-input").value;
    document.getElementById("address-output").innerHTML = address1;

    const wrapper = document.querySelector('.wrapper');
    wrapper.classList.remove('active');
}

function xemketqua() {
    console.log(valueNhipTim);
    const donhiptim = document.querySelector('.donhiptim');
    donhiptim.classList.add('active');
    const ketqua = document.querySelector('.ketqua');
    ketqua.classList.add('active');
    document.getElementById("name-output1").innerHTML = "Họ tên: " + benhnhan_name;
    document.getElementById("age-output1").innerHTML = "Tuổi: " + benhnhan_age;
    document.getElementById("gioitinh-output1").innerHTML = "Giới tính: " + benhnhan_gioitinh;
    document.getElementById("address-output1").innerHTML = "Địa chỉ: " + benhnhan_address;
    document.getElementById("sensor_value-output1").innerHTML = "Nhịp tim: " + valueNhipTim;

    var noidung1 = "Nhịp tim của bạn bình thường!";
    var noidung2 = "Nhịp tim của bạn KHÔNG bình thường. Hãy kiểm tra lại! "

    if (ageIndex == "1") {
        if (valueNhipTim >= 120 && valueNhipTim <= 160 ){
            document.getElementById("loikhuyen").innerHTML = noidung1;
        }else{
            document.getElementById("loikhuyen").innerHTML = noidung2;
        }
    } else if (ageIndex == "2") {
        if (valueNhipTim >= 80 && valueNhipTim <= 140 ){
            document.getElementById("loikhuyen").innerHTML = noidung1;
        }else{
            document.getElementById("loikhuyen").innerHTML = noidung2;
        }
    } else if (ageIndex == "3") {
        if (valueNhipTim >= 80 && valueNhipTim <= 130 ){
            document.getElementById("loikhuyen").innerHTML = noidung1;
        }else{
            document.getElementById("loikhuyen").innerHTML = noidung2;
        }
    } else if (ageIndex == "4") {
        if (valueNhipTim >= 75 && valueNhipTim <= 120 ){
            document.getElementById("loikhuyen").innerHTML = noidung1;
        }else{
            document.getElementById("loikhuyen").innerHTML = noidung2;
        }
    } else if (ageIndex == "5") {
        if (valueNhipTim >= 75 && valueNhipTim <= 110 ){
            document.getElementById("loikhuyen").innerHTML = noidung1;
        }else{
            document.getElementById("loikhuyen").innerHTML = noidung2;
        }
    } else if (ageIndex == "6") {
        if (valueNhipTim >= 60 && valueNhipTim <= 100 ){
            document.getElementById("loikhuyen").innerHTML = noidung1;
        }else{
            document.getElementById("loikhuyen").innerHTML = noidung2;
        }
    } else if (ageIndex == "7") {
        if (valueNhipTim >= 40 && valueNhipTim <= 60 ){
            document.getElementById("loikhuyen").innerHTML = noidung1;
        }else{
            document.getElementById("loikhuyen").innerHTML = noidung2;
        }
    } 

}

function quayvedonhiptim() {
    const donhiptim = document.querySelector('.donhiptim');
    donhiptim.classList.remove('active');
    const ketqua = document.querySelector('.ketqua');
    ketqua.classList.remove('active');
}

function reset() {
    location.reload();
}

function kiemtratuoi() {
    // biết tuổi => nhóm tuổi => nhịp tim khỏe mạnh
    var tuoi = document.getElementById("age-input").value;
}

function laytuoi() {
    var e = document.getElementById("age-input");
    ageIndex = e.value;
    ageValue = e.options[e.selectedIndex].text;
}
