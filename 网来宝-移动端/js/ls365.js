var LsGlobal = {
	deviceTypeIsMobile: false
};
LsGlobal.loadScript = function(b, c) {
	var a = document.createElement("script");
	a.type = "text/javascript";
	if(a.readyState) {
		a.onreadystatechange = function() {
			if(a.readyState === "loaded" || a.readyState === "complete") {
				a.onreadystatechange = null;
				c()
			}
		}
	} else {
		a.onload = function() {
			c()
		}
	}
	a.src = b;
	document.getElementById("body").appendChild(a)
};
LsGlobal.isIE = function() {
	return !!window.ActiveXObject || "ActiveXObject" in window
};
LsGlobal.environmentDecide = function() {
	var c = $(window).height() * 1 - $("#header").height() * 1 - $("#footer").height() * 1,
		b = $("#section"),
		a = b.height();
	if(document.body.clientWidth < 1024 && !LsGlobal.isIE()) {
		this.deviceTypeIsMobile = true
	} else {
		this.deviceTypeIsMobile = false;
		if(LsGlobal.isIE()) {
			if(a < c) {
				b.css("height", c)
			}
			this.loadScript("/libs/js/jquery.placeholder.min.js", function() {
				console.log("IE娴忚鍣╬laceholder瑙ｆ瀽宸插姞杞�");
				$("input, textarea").placeholder()
			})
		} else {
			b.css({
				minHeight: c
			})
		}
	}
};
LsGlobal.environmentDecide();
LsGlobal.forbiddenSeeSources = function() {
	window.onload = function() {
		document.onkeydown = function() {
			var a = window.event || arguments[0];
			if(a.keyCode === 123) {
				return false
			} else {
				if(a.ctrlKey && a.shiftKey && a.keyCode === 73) {
					return false
				} else {
					if(a.shiftKey && a.keyCode === 121) {
						return false
					}
				}
			}
		};
		document.oncontextmenu = function() {
			return false
		}
	}
};
LsGlobal.enableSeeSources = function() {
	window.onload = function() {
		document.onkeydown = function() {
			var a = window.event || arguments[0];
			if(a.keyCode === 123) {
				return true
			} else {
				if(a.ctrlKey && a.shiftKey && a.keyCode === 73) {
					return true
				} else {
					if(a.shiftKey && a.keyCode === 121) {
						return true
					}
				}
			}
		};
		document.oncontextmenu = function() {
			return true
		}
	}
};
LsGlobal.queryParams = function(e) {
	if(!e) {
		return
	}
	var b = location.href,
		c = b.substring(b.indexOf("?") + 1, b.length).split("&"),
		a = {};
	for(i = 0;
		(j = c[i]); i++) {
		a[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length)
	}
	var d = a[e.toLowerCase()];
	if(typeof d === "undefined") {
		return ""
	} else {
		return d
	}
};
LsGlobal.createTips = function() {
	var a = $('<div id="ls-component-tips" class="ls-component-tips"></div>');
	$("#footer").append(a)
};
LsGlobal.createTips();
LsGlobal.asyncTips = function(a, c) {
	var b = $("#ls-component-tips");
	if(a) {
		$(b).addClass("success").html('<p><i class="fa fa-check-circle"></i>' + c + "</p>");
		$(b).slideDown("slow")
	} else {
		$(b).addClass("failure").html('<p><i class="fa fa-exclamation-circle"></i>' + c + "</p>");
		$(b).slideDown("slow")
	}
	setTimeout(function() {
		$(b).hide().removeClass("success failure")
	}, 3000);
	$(b).on("click", function() {
		$(this).hide()
	})
};
LsGlobal.courseItem = function(c, b) {
	var a = "";
	c = [{
		courseLink: "",
		coursePic: "",
		courseName: ""
	}];
	if(!c) {
		return false
	} else {
		$.each(c, function(d, e) {
			a += "<div class='ls-course " + b + "'>";
			a += "<a href='" + e.courseLink + "'>";
			a += "<div><img src='" + e.coursePic + "' /></div>";
			a += "<p>" + e.courseName + "</p>";
			a += "<p></p>";
			a += "</a></div>"
		})
	}
	return a
};
LsGlobal.shiningBg = (function() {
	function a(c, q) {
		var f = this;
		if(q === void 0) {
			q = {}
		}
		this.options = {
			directionX: -1,
			directionY: -1,
			velocityX: [0.1, 0.2],
			velocityY: [0.5, 1],
			bounceX: true,
			bounceY: false,
			parallax: 0.2,
			pivot: 0,
			density: 6000,
			dotRadius: [1, 5],
			backgroundColor: "rgba(99,99,99,1)",
			dotColor: "rgba(99,99,99,.5)",
			linkColor: "rgba(99,99,99,.5)",
			linkDistance: 50,
			linkWidth: 2
		};
		var c = typeof c === "string" || c instanceof String ? document.getElementById(c) : c;
		if(c.tagName !== "CANVAS") {
			throw "no canvas"
		}
		for(var l in q) {
			this.options[l] = q[l]
		}
		q = this.options;
		var p = (this._ctx = c.getContext("2d", {
				alpha: !q.backgroundColor
			})),
			o = {
				x: 0,
				y: 0
			},
			m, k, e;
		var d = function() {
			if(q.backgroundColor) {
				p.fillStyle = q.backgroundColor;
				p.fillRect(0, 0, k, e);
				p.fillStyle = q.dotColor
			} else {
				p.clearRect(0, 0, k, e)
			}
			p.beginPath();
			for(var v = 0, s, D, B; v < m.length; v++) {
				s = m[v];
				s.x += s.vx;
				s.y += s.vy;
				if(q.parallax) {
					var t = s.z * q.parallax;
					s.dx += (o.x * t - s.dx) / 10;
					s.dy += (o.y * t - s.dy) / 10
				}
				D = s.x + s.dx;
				B = s.y + s.dy;
				if(D < 0 || D > k) {
					q.bounceX ? (s.vx = -s.vx) : (s.x = ((D + k) % k) - s.dx)
				}
				if(B < 0 || B > e) {
					q.bounceY ? (s.vy = -s.vy) : (s.y = ((B + e) % e) - s.dy)
				}
				p.moveTo(D + s.r, B);
				p.arc(D, B, s.r, 0, Math.PI * 2);
				for(var u = v - 1; u >= 0; u--) {
					var r = m[u],
						G = r.x - s.x,
						F = r.y - s.y,
						z = Math.sqrt(G * G + F * F);
					if(z < q.linkDistance) {
						var D = s.x + s.dx,
							B = s.y + s.dy,
							h = r.x + r.dx,
							A = r.y + r.dy,
							C = Math.atan2(A - B, h - D),
							E = Math.cos(C),
							w = Math.sin(C);
						D += s.r * E;
						B += s.r * w;
						h -= r.r * E;
						A -= r.r * w;
						p.moveTo(D, B);
						p.lineTo(h, A)
					}
				}
			}
			p.stroke();
			q.dotColor && p.fill();
			requestAnimationFrame(d)
		};

		function g(h) {
			o.x = h.pageX - window.innerWidth / 2;
			o.y = h.pageY - window.innerHeight / 2
		}

		function n(h) {
			o.x = Math.min(Math.max(-h.gamma, -30), 30) * (window.innerWidth / 30);
			o.y = Math.min(Math.max(-h.beta, -30), 30) * (window.innerHeight / 30)
		}
		var b = (this._refresh = function() {
			m = f._ = f._ || [];
			var h = [].concat(q.dotRadius);
			if(h.length == 1 || h[0] == h[1]) {
				h = h[0]
			}
			k = c.width = c.offsetWidth;
			e = c.height = c.offsetHeight;
			var v = q.velocityX,
				u = q.velocityY,
				x = Math.random;
			var s = Math.ceil((k * e) / q.density);
			for(var t = m.length - 1; t >= 0; t--) {
				if(m[t].x > k || m[t].y > e) {
					m.splice(t, 1)
				}
			}
			if(s < m.length) {
				m.splice(s)
			}
			while(s > m.length) {
				var w = x();
				m.push({
					z: (w - q.pivot) / 4,
					r: h[1] ? w * (h[1] - h[0]) + h[0] : h,
					x: Math.ceil(x() * k),
					y: Math.ceil(x() * e),
					vx: (q.directionX || (x() > 0.5 ? 1 : -1)) * (x() * (v[1] - v[0]) + v[0]),
					vy: (q.directionY || (x() > 0.5 ? 1 : -1)) * (x() * (u[1] - u[0]) + u[0]),
					dx: 0,
					dy: 0
				})
			}
			p.strokeStyle = q.linkColor;
			p.lineWidth = q.linkWidth;
			p.fillStyle = q.dotColor
		});
		window.addEventListener("resize", b, false);
		document.addEventListener("mousemove", g, false);
		window.addEventListener("deviceorientation", n, false);
		b();
		d()
	}
	return a
})();
(function() {
	var b = 0;
	var c = ["ms", "moz", "webkit", "o"];
	for(var a = 0; a < c.length && !window.requestAnimationFrame; ++a) {
		window.requestAnimationFrame = window[c[a] + "RequestAnimationFrame"];
		window.cancelAnimationFrame = window[c[a] + "CancelAnimationFrame"] || window[c[a] + "CancelRequestAnimationFrame"]
	}
	if(!window.requestAnimationFrame) {
		window.requestAnimationFrame = function(h, e) {
			var d = new Date().getTime();
			var f = Math.max(0, 16 - (d - b));
			var g = window.setTimeout(function() {
				h(d + f)
			}, f);
			b = d + f;
			return g
		}
	}
	if(!window.cancelAnimationFrame) {
		window.cancelAnimationFrame = function(d) {
			clearTimeout(d)
		}
	}
})();
if((LsGlobal.isIE() && navigator.userAgent.toLowerCase().match(/msie ([\d.]+)/)[1] > 8) || !LsGlobal.isIE()) {
	LsGlobal = Object.freeze(LsGlobal)
} else {
	window.location.href = "/update.html"
};