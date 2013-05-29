(function ($) {
    $.fn.validate = function (options) {
		//settings
        var settings = $.extend({
			//the Error messages
            required: "Field Is Required",
            email: "Email is not valid",
            password: "Password is not valid",
            match: "Password does not match",
            number: "Value is not a valid number",
            time: "Value is not a valid time",
			//the help element class
            helpClass: ".help-inline"
        }, options);
        var clean = true, $this = this;
        ($this.is("input") ? $this : $this.find("input")).each(function () {
            var ths = $(this), val = ths.val(), help = ths.next(settings.helpClass);
            if (ths.data("required") && val == "") {
                clean = false;
                help.show().html(settings.required);
            }
            if (clean && ths.data("email") && !ValidateEmail(val)) {
                clean = false;
                help.show().html(settings.email);
            }
            if (clean && ths.data("password") && !ValidatePassword(val)) {
                clean = false;
                help.show().html(settings.password);
            }
            if (clean && ths.data("match") && $("#" + ths.data("matchwith"))) {
                clean = false;
                help.show().html(settings.match);
            }
            if (clean && ths.data("number") && isNaN(val)) {
                clean = false;
                help.show().html(settings.number);
            }
            if (clean && ths.data("time") && !ValidateTime(val)) {
                clean = false;
                help.show().html(settings.time);
            }
            if (clean) {
                help.hide();
            } else {
                ths.one("blur", function () {
                    $(this).validate();
                });
            }
        });
        return clean;
    };
	function ValidatePassword(s) {
        var re = /^(?=^.{8,}$)((?=.*\d)^(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
            r = /[\W]/g;
        return (!(s == "" || s.search(re) == -1 || s.search(r) == -1));
    }
    function ValidateEmail(s) {
        return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(s);
    }
    function ValidateTime(s) {
        return /^(0?[1-9]|1[0-9]|2[0-3])(:[0-5]\d)( [APap][mM])?$/.test(s);
    }
})(jQuery);
