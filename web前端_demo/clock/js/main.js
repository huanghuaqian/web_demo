$(function() {
    //new clock();
    $(".menu-detail").each(function() {
        $(this).bind('click', function() {
            var c = $(this).index();
            switch (c) {
                case 0:
                    new calculator();
                    break;
                case 1:
                    new clock();
                    break;
                case 2:
                    new register();
                    break;
            }
        });
    });
});
(function(window) {
    var calculator = function() {
        this.x = "";
        this.y = "";
        this.result = "";
        this.symbol = "";
        this.xml = "";
        this.isclickSymbol = 0;
        this.isPoint = false;
        this.preClick = "";
        this.getResult = 0;
        this.buttonArray = ["AC", "←", "+/-", "÷", "7", "8", "9", "×", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "="];
        this.buttonStyle = ["symbol1", "symbol1", "symbol", "symbol",
            "number", "number", "number", "symbol",
            "number", "number", "number", "symbol",
            "number", "number", "number", "symbol",
            "largnumber", "number", "symbol"
        ];
        this.setView();
        this.setAction();
    }
    calculator.prototype = {
        setView: function() {
            this.xml = "";
            this.xml += "<div id='calculator-container'>";
            this.xml += "<div class='calculator-show'>0</div>";
            this.xml += "<div class='calculator-buttongroup'>";
            for (var i = 0; i < this.buttonArray.length; i++) {
                this.xml += "<div class='calculator-button button-" + this.buttonStyle[i] + "'>" + this.buttonArray[i] + "</div>"
            }
            this.xml += "</div>";
            this.xml += "</div>";
            $(".container-span").html(this.xml);
        },
        setAction: function() {
            var obj = this;
            $(".calculator-button").each(function() {
                $(this).bind('click', function() {
                    var v = $(this).html();
                    var c = $(this).attr('class');
                    if (v == "AC") {
                        obj.setClear();
                    }
                    if (v == "←") {
                        if (obj.result.length == 1) {
                            if (obj.isclickSymbol == 0) {
                                obj.x = 0;
                            } else {
                                obj.y = 0;
                            }
                            obj.result = 0;
                        } else {
                            if (obj.isclickSymbol == 0) {
                                obj.x = obj.x = obj.x.substring(0, obj.x.length - 1);;
                            } else {
                                obj.y = obj.y = obj.y.substring(0, obj.y.length - 1);;
                            }
                            obj.result = obj.result.substring(0, obj.result.length - 1);
                        }
                    }
                    if (v == "+/-") {
                        if (obj.isclickSymbol == 0) {
                            obj.x = obj.x * -1;
                        } else {
                            obj.y = obj.y * -1;
                        }
                        if (obj.preClick != "+" && obj.preClick != "-" && obj.preClick != "×" && obj.preClick != "÷") {
                            obj.result = obj.result * -1 + "";
                        }

                    }
                    if (c.indexOf('number') >= 0) {

                        if (obj.preClick == "=") {
                            obj.y = "";
                        }
                        if (v == "." && obj.isPoint) {
                            return;
                        } else {
                            if (obj.isclickSymbol == 0) {
                                if (obj.x.length < 9) {
                                    if (obj.x == 0) {
                                        obj.x = v;
                                    } else {
                                        obj.x += v;
                                    }
                                }
                                obj.result = obj.x;
                            } else if (obj.isclickSymbol == 1) {
                                if (obj.y.length < 9) {
                                    if (obj.y == 0) {
                                        obj.y = v;
                                    } else {
                                        obj.y += v;
                                    }
                                }
                                obj.result = obj.y;
                            }
                            if (v == ".") {
                                obj.isPoint = true;
                            }
                        }
                    }
                    if (v == "+") {
                        obj.setCalculate();
                        obj.symbol = "+";
                        obj.isclickSymbol = 1;
                        obj.isPoint = false;
                    }
                    if (v == "×") {
                        obj.setCalculate();
                        obj.symbol = "*";
                        obj.isclickSymbol = 1;
                        obj.isPoint = false;
                    }
                    if (v == "-") {
                        obj.setCalculate();
                        obj.symbol = "-";
                        obj.isclickSymbol = 1;
                        obj.isPoint = false;
                    }
                    if (v == "÷") {
                        obj.setCalculate();
                        obj.symbol = "/";
                        obj.isclickSymbol = 1;
                        obj.isPoint = false;
                    }
                    if (v == "=") {
                        if (obj.symbol == "/" && obj.y == 0) {
                            obj.result = 0;
                        } else {
                            obj.result = eval(obj.x + obj.symbol + obj.y);
                        }
                        obj.getResult = 1;
                    }
                    obj.preClick = v;
                    obj.setValue();
                });
            });
        },
        setValue: function() {
            if (this.result == "") {
                $(".calculator-show").html("0");
            } else {
                $(".calculator-show").html(this.result);
            }
        },
        setClear: function() {
            this.x = "";
            this.y = "";
            this.result = "";
            this.symbol = "";
            this.isPoint = false;
            this.isclickSymbol = 0;
            this.getResult = 0;
            this.preClick = "";
            $(".calculator-show").html(0);
        },
        setCalculate: function() {
            if (this.isclickSymbol == 1) {
                if (this.getResult == 1) {
                    this.x = this.result;
                } else {
                    if (this.symbol == "/" && this.y == 0) {
                        this.result = 0;
                    } else {
                        this.result = eval(this.x + this.symbol + this.y);
                    }
                    this.x = this.result;
                }
                this.y = "";
                this.getResult = 0;
            }
        }
    }
    window.calculator = calculator;

    var clock = function() {
        this.year = "";
        this.month = "";
        this.date = "";
        this.hour = "";
        this.minutes = "";
        this.second = "";
        this.xml = "";
        this.context = null;
        this.setView();
        this.drawClock();
        this.run();
    }
    clock.prototype = {
        init: function() {
            var d = new Date();
            this.year = d.getFullYear();
            this.month = d.getMonth() + 1;
            if (this.month < 10) {
                this.month = "0" + this.month;
            }
            this.date = d.getDate();
            if (this.date < 10) {
                this.date = "0" + this.date;
            }
            this.hour = d.getHours();
            if (this.hour < 10) {
                this.hour = "0" + this.hour;
            }
            this.minutes = d.getMinutes();
            if (this.minutes < 10) {
                this.minutes = "0" + this.minutes;
            }
            this.second = d.getSeconds();
            if (this.second < 10) {
                this.second = "0" + this.second;
            }
        },
        setView: function() {
            this.xml = "";
            this.xml += "<div id='clock-container'>";
            this.xml += "<canvas id='mycanvas' width='450' height='450'></canvas>";
            this.xml += "<div class='clock-date'></div>";
            this.xml += "</div>";
            $(".container-span").html(this.xml);
        },
        drawClock: function() {
            var c = document.getElementById("mycanvas");
            this.context = c.getContext("2d");
            //the span of clock
            this.context.save();
            this.context.translate(225, 225);
            this.context.strokeStyle = "#000000";
            this.context.beginPath();
            this.context.arc(0, 0, 200, 0, 2 * Math.PI);
            this.context.stroke();
            this.context.closePath();
            //the center point of clock
            this.context.beginPath();
            this.context.fillStyle = "#000000"
            this.context.arc(0, 0, 4, 0, 2 * Math.PI);
            this.context.fill();
            this.context.closePath();
            //draw scale
            for (var j = 0; j < 12; j++) {
                for (var i = 0; i < 5; i++) {
                    this.context.beginPath();
                    this.context.fillStyle = "#7a7875";
                    this.context.rotate(Math.PI / 30);
                    if (i == 4) {
                        this.context.rect(0, -200, 5, 15);
                    } else {
                        this.context.rect(0, -200, 5, 7);
                    }
                    this.context.fill();
                    this.context.closePath();
                }
            }

            //hours hand
            this.context.save();
            this.context.beginPath();
            this.context.fillStyle = "#000000";
            this.context.rotate((Math.PI / 6) * this.hour + (Math.PI / 360) * this.minutes + (Math.PI / 21600) * this.second - Math.PI / 2);
            this.context.rect(-8, -5, 120, 9);
            this.context.fill();
            this.context.closePath();
            this.context.restore();

            //minus hand
            this.context.save();
            this.context.beginPath();
            this.context.fillStyle = "#3ab9f8";
            this.context.rotate((Math.PI / 30) * this.minutes + (Math.PI / 1800) * this.second - Math.PI / 2);
            this.context.rect(-18, -4, 190, 7);
            this.context.fill();
            this.context.closePath();
            this.context.restore();
            //second hand
            this.context.save();
            this.context.beginPath();
            this.context.fillStyle = "#f8603a";
            this.context.rotate((Math.PI * this.second / 30) - Math.PI / 2);
            this.context.rect(-30, -1, 210, 3);
            this.context.fill();
            this.context.closePath();
            this.context.restore();
            this.context.restore();
        },
        run: function() {
            var o = this;
            setInterval(function() {
                o.init();
                $(".clock-date").html(o.year + "-" + o.month + "-" + o.date + " " + o.hour + ":" + o.minutes + ":" + o.second);
                if (o.context != null) {
                    o.context.clearRect(0, 0, 450, 450);
                }
                o.drawClock();
            }, 1000);
        }
    }
    window.clock = clock;


    var register = function() {
        this.xml = "";
        this.classArray = ["username", "password", "confirmpass", "email", "qqnumber", "profile"];
        this.textArray = ["\u7528\u0020\u6237\u0020\u540d\uff1a", "\u8bbe\u7f6e\u5bc6\u7801\uff1a", "\u786e\u8ba4\u5bc6\u7801\uff1a",
            "\u4e2a\u4eba\u90ae\u7bb1\uff1a", "\u0051\u0051\u53f7\u0020\u7801\uff1a", "\u4e2a\u4eba\u4ecb\u7ecd\uff1a"
        ];
        this.placehold = [
            "\u60a8\u7684\u7528\u6237\u540d",
            "\u5efa\u8bae\u4f7f\u7528\u4e24\u79cd\u5b57\u7b26\u7ec4\u5408",
            "\u518d\u6b21\u8f93\u5165\u5bc6\u7801",
            "\u8bf7\u8f93\u5165\u90ae\u7bb1\u5730\u5740",
            "\u8bf7\u8f93\u5165\u0051\u0051\u53f7\u7801",
            "\u8bf7\u8f93\u5165\u4e2a\u4eba\u4ecb\u7ecd\uff08\u0032\u0030\u0030\u5b57\u4ee5\u5185\uff09"
        ];
        this.passSubmit = true;
        this.init();
    }
    register.prototype = {
        init: function() {
            this.xml = "";
            this.xml += "<div id='register-container'>";
            this.xml += "<div class='register-span'>";
            for (var i = 0; i < this.classArray.length; i++) {
                this.xml += "<div class='register-cell register-" + this.classArray[i] + "'>";
                this.xml += "<div class='register-cellspan'>";
                this.xml += "<div class='register-text'>" + this.textArray[i] + "</div>";
                this.xml += "<div class='register-input'>";
                if (i == 1 || i == 2) {
                    this.xml += "<input type='password' maxlength='20' placeholder='" + this.placehold[i] + "'>";
                } else if (i == 5) {
                    this.xml += "<textarea maxlength='200' placeholder='" + this.placehold[i] + "'></textarea>";
                } else {
                    this.xml += "<input type='text' maxlength='20' placeholder='" + this.placehold[i] + "'>";
                }
                this.xml += "<div class='loading-span'></div>";
                this.xml += "</div>";
                this.xml += "</div>";
                this.xml += "<div class='register-msg'>";
                this.xml += "<div class='img'></div>";
                this.xml += "<div class='msg'></div>";
                this.xml += "</div>"
                this.xml += "</div>";
            }
            this.xml += "</div>";
            this.xml += "<div class='rigester-submit'>\u7acb\u5373\u6ce8\u518c</div>";
            this.xml += "</div>";
            $(".container-span").html(this.xml);
            this.setAction();
        },
        setAction: function() {
            var obj = this;
            //username
            $(".register-username input").focus(function() {
                $(".register-username .register-msg .msg").html('\u652f\u6301\u4e2d\u6587\u3001\u5b57\u6bcd\u3001' +
                    '\u6570\u5b57\u5efa\u8bae\u0036\u002d\u0032\u0030\u5b57\u7b26\u4ee5\u5185');
                $(".register-username .register-msg .img").css("background-image", "url('../img/tips.png')");
            });
            $(".register-username input").blur(function() {
                obj.checkUsername();
            });
            //password
            $(".register-password input").focus(function() {
                $(".register-password .register-msg .msg").html('\u4f7f\u7528\u0036\u002d\u0032\u0030\u4f4d\u81f3\u5c11' +
                    '\u4e24\u79cd\u5b57\u7b26\u4ee5\u4e0a\u7ec4\u5408');
                $(".register-password .register-msg .img").css("background-image", "url('../img/tips.png')");
            });
            $(".register-password input").blur(function() {
                obj.checkPassWord();
            });
            //confirmpass
            $(".register-confirmpass input").focus(function() {
                $(".register-confirmpass .register-msg .msg").html('\u8bf7\u518d\u6b21\u8f93\u5165\u5bc6\u7801');
                $(".register-confirmpass .register-msg .img").css("background-image", "url('../img/tips.png')");
            });
            $(".register-confirmpass input").blur(function() {
                obj.checkConfirm();
            });
            //email
            $(".register-email input").focus(function() {
                $(".register-email .register-msg .msg").html('\u8bf7\u8f93\u5165\u90ae\u7bb1\u5730\u5740');
                $(".register-email .register-msg .img").css("background-image", "url('../img/tips.png')");
            });
            $(".register-email input").blur(function() {
                obj.checkEmail();
            });
            //QQnumber
            $(".register-qqnumber input").focus(function() {
                $(".register-qqnumber .register-msg .msg").html('\u8bf7\u8f93\u5165\u0051\u0051\u53f7\u7801');
                $(".register-qqnumber .register-msg .img").css("background-image", "url('../img/tips.png')");
            });
            $(".register-qqnumber input").blur(function() {
                obj.checkQQnumber();
            });
            //profile
            $(".register-profile textarea").focus(function() {
                $(".register-profile .register-msg .msg").html('');
                $(".register-profile .register-msg .img").css("background-image", "none");
            });
            //register
            $('.rigester-submit').bind('click', function() {
                obj.passSubmit = true;
                var v1 = $.trim($(".register-username input").val()),
                    v2 = $.trim($(".register-password input").val()),
                    v3 = $.trim($(".register-email input").val()),
                    v4 = $.trim($(".register-qqnumber input").val()),
                    v5 = $.trim($(".register-profile textarea").val()),
                    v6 = $.trim($(".register-confirmpass input").val());
                if (v1 == "") {
                    $(".register-username .register-msg .msg").html('\u8bf7\u8f93\u5165\u7528\u6237\u540d');
                    $(".register-username .register-msg .img").css("background-image", "url('../img/stop.png')");
                    $(".register-username .loading-span").css("background-image", "none");
                    obj.passSubmit = false;
                } else {
                    obj.checkUsername();
                }
                if (v2 == "") {
                    $(".register-password .register-msg .msg").html('\u8bf7\u8f93\u5165\u5bc6\u7801');
                    $(".register-password .register-msg .img").css("background-image", "url('../img/stop.png')");
                    $(".register-password .loading-span").css("background-image", "none");
                } else {
                    obj.checkPassWord();
                }
                if (v3 == "") {
                    $(".register-email .register-msg .msg").html('\u8bf7\u8f93\u5165\u90ae\u7bb1\u5730\u5740');
                    $(".register-email .register-msg .img").css("background-image", "url('../img/stop.png')");
                    $(".register-email .loading-span").css("background-image", "none");
                } else {
                    obj.checkEmail();
                }
                if (v4 == "") {
                    $(".register-qqnumber .register-msg .msg").html('\u8bf7\u8f93\u5165\u0051\u0051\u53f7\u7801');
                    $(".register-qqnumber .register-msg .img").css("background-image", "url('../img/stop.png')");
                    $(".register-qqnumber .loading-span").css("background-image", "none");
                } else {
                    obj.checkQQnumber();
                }
                if (v5 == "") {
                    $(".register-profile .register-msg .msg").html('\u8bf7\u8f93\u5165\u4e2a\u4eba\u4fe1\u606f');
                    $(".register-profile .register-msg .img").css("background-image", "url('../img/stop.png')");
                    $(".register-profile .loading-span").css("background-image", "none");
                    obj.passSubmit = false;
                }
                if (v6 == "") {
                    $(".register-confirmpass .register-msg .msg").html('\u8bf7\u8f93\u5165\u786e\u8ba4\u5bc6\u7801');
                    $(".register-confirmpass .register-msg .img").css("background-image", "url('../img/stop.png')");
                    $(".register-confirmpass .loading-span").css("background-image", "none");
                } else {
                    obj.checkConfirm();
                }
                if (obj.passSubmit) {
                    alert("\u63a5\u4e0b\u6765\u53ef\u4ee5\u53d1\u9001\u0061\u006a\u0061\u0078\u8bf7\u6c42");
                }
            });
        },
        checkUsername: function() {
            var obj = this;
            var v = $.trim($(".register-username input").val());
            if (v != "") {
                if (/[^\w\u4e00-\u9fa5]/g.test(v)) {
                    $(".register-username .register-msg .msg").html('\u683c\u5f0f\u9519\u8bef\uff0c\u4ec5\u652f\u6301' +
                        '\u6c49\u5b57\u3001\u5b57\u6bcd\u3001\u6570\u5b57');
                    $(".register-username .register-msg .img").css("background-image", "url('../img/stop.png')");
                    $(".register-username .loading-span").css("background-image", "none");
                    obj.passSubmit = false;
                } else if (/^[0-9]*$/.test(v) && v != "") {
                    $(".register-username .register-msg .msg").html('\u683c\u5f0f\u9519\u8bef\uff0c\u4e0d\u80fd\u4e3a\u7eaf\u6570\u5b57\u683c\u5f0f');
                    $(".register-username .register-msg .img").css("background-image", "url('../img/stop.png')");
                    $(".register-username .loading-span").css("background-image", "none");
                    obj.passSubmit = false;
                } else {
                    $(".register-username .register-msg .msg").html('');
                    $(".register-username .register-msg .img").css("background-image", "none");
                    $(".register-username .loading-span").css("background-image", "url('../img/success.png')");
                }
            } else {
                $(".register-username .register-msg .msg").html('');
                $(".register-username .register-msg .img").css("background-image", "none");
                obj.passSubmit = false;
            }
        },
        checkPassWord: function() {
            var obj = this;
            var v = $.trim($(".register-password input").val());
            if (v != "") {
                if (!/(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,20}$/.test(v)) {
                    $(".register-password .register-msg .msg").html('\u8bf7\u4f7f\u7528\u5b57\u6bcd\u3001\u6570' +
                        '\u5b57\u548c\u7b26\u53f7\u4e24\u79cd\u4ee5\u4e0a\u7684\u0036\u002d\u0032\u0030\u4f4d\u5b57\u7b26');
                    $(".register-password .register-msg .img").css("background-image", "url('../img/stop.png')");
                    $(".register-password .loading-span").css("background-image", "none");
                    obj.passSubmit = false;
                } else {
                    $(".register-password .register-msg .msg").html('');
                    $(".register-password .register-msg .img").css("background-image", "none");
                    $(".register-password .loading-span").css("background-image", "url('../img/success.png')");
                }
            } else {
                $(".register-password .register-msg .msg").html('');
                $(".register-password .register-msg .img").css("background-image", "none");
                obj.passSubmit = false;
            }
        },
        checkConfirm: function() {
            var obj = this;
            var v = $.trim($(".register-confirmpass input").val());
            var v1 = $.trim($(".register-password input").val());
            if (v != "") {
                if (v1 != v) {
                    $(".register-confirmpass .register-msg .msg").html('\u8bf7\u4f7f\u7528\u5b57\u6bcd\u3001\u6570' +
                        '\u5b57\u548c\u7b26\u53f7\u4e24\u79cd\u4ee5\u4e0a\u7684\u0036\u002d\u0032\u0030\u4f4d\u5b57\u7b26');
                    $(".register-confirmpass .register-msg .img").css("background-image", "url('../img/stop.png')");
                    $(".register-confirmpass .loading-span").css("background-image", "none");
                    obj.passSubmit = false;
                } else {
                    $(".register-confirmpass .register-msg .msg").html('');
                    $(".register-confirmpass .register-msg .img").css("background-image", "none");
                    $(".register-confirmpass .loading-span").css("background-image", "url('../img/success.png')");
                }
            } else {
                $(".register-confirmpass .register-msg .msg").html('');
                $(".register-confirmpass .register-msg .img").css("background-image", "none");
                obj.passSubmit = false;
            }
        },
        checkEmail: function() {
            var obj = this;
            var v = $.trim($(".register-email input").val());
            if (v != "") {
                if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(v)) {
                    $(".register-email .register-msg .msg").html('\u8f93\u5165\u7684\u90ae\u7bb1\u683c\u5f0f\u4e0d\u6b63\u786e');
                    $(".register-email .register-msg .img").css("background-image", "url('../img/stop.png')");
                    $(".register-email .loading-span").css("background-image", "none");
                    obj.passSubmit = false;
                } else {
                    $(".register-email .register-msg .msg").html('');
                    $(".register-email .register-msg .img").css("background-image", "none");
                    $(".register-email .loading-span").css("background-image", "url('../img/success.png')");
                }
            } else {
                $(".register-email .register-msg .msg").html('');
                $(".register-email .register-msg .img").css("background-image", "none");
                obj.passSubmit = false;
            }
        },
        checkQQnumber: function() {
            var obj = this;
            var v = $.trim($(".register-qqnumber input").val());
            if (v != "") {
                if (!/^[0-9]*$/.test(v)) {
                    $(".register-qqnumber .register-msg .msg").html('\u8f93\u5165\u7684\u0051\u0051\u53f7\u7801\u4e0d\u6b63\u786e');
                    $(".register-qqnumber .register-msg .img").css("background-image", "url('../img/stop.png')");
                    $(".register-qqnumber .loading-span").css("background-image", "none");
                    obj.passSubmit = false;
                } else {
                    $(".register-qqnumber .register-msg .msg").html('');
                    $(".register-qqnumber .register-msg .img").css("background-image", "none");
                    $(".register-qqnumber .loading-span").css("background-image", "url('../img/success.png')");
                }
            } else {
                $(".register-qqnumber .register-msg .msg").html('');
                $(".register-qqnumber .register-msg .img").css("background-image", "none");
                obj.passSubmit = false;
            }
        }
    }
    window.register = register;
})(window);
