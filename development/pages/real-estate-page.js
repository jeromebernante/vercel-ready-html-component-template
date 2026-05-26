(function () {
  "use strict";

  const D = typeof REAL_ESTATE_SITE_DATA !== "undefined" ? REAL_ESTATE_SITE_DATA : null;
  if (!D) {
    console.error("real-estate-site-data.js must load before real-estate-page.js");
    return;
  }

  function esc(s) {
    if (s == null) return "";
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  const ICON = {
    phone14:
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>',
    mail14:
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',
    phone18:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>',
    heart:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
    bed: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-2h18v2h2v-9c0-2.21-1.79-4-4-4z"/></svg>',
    bath: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2 2H5V3h14v18zm-2 .82c0 .11-.08.18-.18.18H7.18C7.08 22 7 21.93 7 21.82V21h10v.82z"/></svg>',
    area: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>',
    social: {
      facebook:
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z"/></svg>',
      twitter:
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/></svg>',
      instagram:
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8A3.6 3.6 0 0 0 20 16.4V7.6A3.6 3.6 0 0 0 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>',
    },
  };

  function renderMenuLinks(menu) {
    return menu
      .map(function (item) {
        return (
          '<a href="' + esc(item.href) + '">' + esc(item.label) + "</a>"
        );
      })
      .join("");
  }

  function renderMenuList(menu) {
    return menu
      .map(function (item) {
        return (
          "<li><a href=\"" + esc(item.href) + "\">" + esc(item.label) + "</a></li>"
        );
      })
      .join("");
  }

  function renderSelectOptions(items) {
    return items
      .map(function (o, index) {
        var val = esc(o.value);
        var lab = esc(o.label);
        var sel = index === 0 ? " selected" : "";
        return '<option value="' + val + '"' + sel + ">" + lab + "</option>";
      })
      .join("");
  }

  function renderProperties(properties) {
    return properties
      .map(function (p) {
        return (
          '<article class="prop-card">' +
          '<div class="thumb-wrap">' +
          '<img src="' +
          esc(p.image) +
          '" width="600" height="400" alt="' +
          esc(p.alt || p.title) +
          '">' +
          '<button type="button" class="fav-btn" aria-label="Add to favorites">' +
          ICON.heart +
          "</button>" +
          "</div>" +
          '<div class="body">' +
          "<h3>" +
          esc(p.title) +
          "</h3>" +
          '<div class="prop-meta">' +
          "<span>" +
          ICON.bed +
          " " +
          esc(p.beds) +
          "</span>" +
          "<span>" +
          ICON.bath +
          " " +
          esc(p.baths) +
          "</span>" +
          "<span>" +
          ICON.area +
          " " +
          esc(p.area) +
          "</span>" +
          "</div>" +
          '<div class="prop-price">' +
          esc(p.price) +
          "</div>" +
          "</div>" +
          "</article>"
        );
      })
      .join("");
  }

  function renderPagination(p) {
    var html = "";
    var i;
    for (i = 1; i <= p.totalPages; i++) {
      if (i === p.currentPage) {
        html +=
          '<span class="current" aria-current="page">' + esc(String(i)) + "</span>";
      } else {
        html +=
          '<a href="' +
          esc(p.pageHrefPrefix) +
          '">' +
          esc(String(i)) +
          "</a>";
      }
    }
    html +=
      '<a href="' +
      esc(p.pageHrefPrefix) +
      '" class="next">' +
      esc(p.nextLabel) +
      "</a>";
    return html;
  }

  function renderFeatured(items) {
    return items
      .map(function (f) {
        return (
          '<figure class="feat-card">' +
          '<img src="' +
          esc(f.image) +
          '" width="' +
          esc(f.width || 1200) +
          '" height="' +
          esc(f.height || 630) +
          '" alt="' +
          esc(f.alt || f.title) +
          '">' +
          "<figcaption>" +
          esc(f.title) +
          "</figcaption>" +
          "</figure>"
        );
      })
      .join("");
  }

  function renderPartnerStrip(partners) {
    if (partners.logos && partners.logos.length) {
      return partners.logos
        .map(function (logo) {
          if (logo.src) {
            return (
              '<img src="' +
              esc(logo.src) +
              '" alt="' +
              esc(logo.alt || "") +
              '" class="partner-logo" loading="lazy">'
            );
          }
          return '<span class="logo-placeholder" aria-hidden="true"></span>';
        })
        .join("");
    }
    var n = partners.placeholderCount || 5;
    var out = "";
    var j;
    for (j = 0; j < n; j++) {
      out += '<span class="logo-placeholder" aria-hidden="true"></span>';
    }
    return out;
  }

  function renderSocial(social) {
    return social
      .map(function (s) {
        var svg = ICON.social[s.icon] || "";
        return (
          '<a href="' +
          esc(s.href) +
          '" aria-label="' +
          esc(s.network) +
          '">' +
          svg +
          "</a>"
        );
      })
      .join("");
  }

  function apply() {
    document.title = D.meta.title;

    var el;

    el = document.getElementById("js-top-logo");
    if (el) el.textContent = D.meta.brandName;

    el = document.getElementById("js-top-contact");
    if (el) {
      el.innerHTML =
        '<a href="tel:' +
        esc(D.contact.phoneTel) +
        '">' +
        ICON.phone14 +
        esc(D.contact.phoneDisplay) +
        "</a>" +
        '<a href="mailto:' +
        esc(D.contact.email) +
        '">' +
        ICON.mail14 +
        esc(D.contact.email) +
        "</a>";
    }

    el = document.getElementById("js-main-nav");
    if (el) el.innerHTML = renderMenuLinks(D.menu);

    el = document.getElementById("js-hero");
    if (el && D.hero && D.hero.backgroundImage) {
      el.style.backgroundImage = "url(\"" + D.hero.backgroundImage.replace(/"/g, '\\"') + "\")";
      if (D.hero.minHeight) el.style.minHeight = D.hero.minHeight;
    }

    el = document.getElementById("js-search-form");
    if (el) {
      el.innerHTML =
        '<label><span class="visually-hidden">' +
        esc(D.search.locationLabel) +
        "</span>" +
        '<select name="location" aria-label="' +
        esc(D.search.locationLabel) +
        '">' +
        renderSelectOptions(D.search.locations) +
        "</select></label>" +
        '<label><span class="visually-hidden">' +
        esc(D.search.typeLabel) +
        "</span>" +
        '<select name="type" aria-label="' +
        esc(D.search.typeLabel) +
        '">' +
        renderSelectOptions(D.search.types) +
        "</select></label>" +
        '<label><span class="visually-hidden">' +
        esc(D.search.priceLabel) +
        "</span>" +
        '<select name="price" aria-label="' +
        esc(D.search.priceLabel) +
        '">' +
        renderSelectOptions(D.search.prices) +
        "</select></label>" +
        '<button type="submit" class="btn-search">' +
        esc(D.search.submitLabel) +
        "</button>";
    }

    el = document.getElementById("js-intro-heading");
    if (el) el.textContent = D.intro.heading;
    el = document.getElementById("js-intro-body");
    if (el) el.textContent = D.intro.body;

    el = document.getElementById("js-featured");
    if (el) el.innerHTML = renderFeatured(D.featured);

    el = document.getElementById("js-properties-title");
    if (el) el.textContent = D.propertiesSectionTitle;

    el = document.getElementById("js-properties-grid");
    if (el) el.innerHTML = renderProperties(D.properties);

    el = document.getElementById("js-pagination");
    if (el) el.innerHTML = renderPagination(D.pagination);

    el = document.getElementById("js-touch-section");
    if (el && D.touch.backgroundImage) {
      el.style.backgroundImage =
        "linear-gradient(rgba(118, 210, 148, 0.85), rgba(118, 210, 148, 0.85)), url(\"" +
        D.touch.backgroundImage.replace(/"/g, '\\"') +
        "\")";
    }

    el = document.getElementById("js-touch-title");
    if (el) el.textContent = D.touch.heading;

    el = document.getElementById("js-inquire-title");
    if (el) el.textContent = D.touch.formTitle;

    el = document.getElementById("js-send-email-btn");
    if (el) el.textContent = D.touch.sendButtonLabel;

    el = document.getElementById("js-agent-card");
    if (el) {
      var phonesHtml = D.agent.phones
        .map(function (p) {
          return esc(p);
        })
        .join("<br>");
      el.innerHTML =
        '<img src="' +
        esc(D.agent.photo) +
        '" width="512" height="512" alt="' +
        esc(D.agent.photoAlt) +
        '">' +
        '<div class="name">' +
        esc(D.agent.name) +
        "</div>" +
        '<div class="lines">' +
        phonesHtml +
        "<br>" +
        esc(D.agent.email) +
        "</div>" +
        '<a class="btn-profile" href="' +
        esc(D.agent.profileHref) +
        '">' +
        esc(D.agent.profileLabel) +
        "</a>";
    }

    el = document.getElementById("js-portfolio-title");
    if (el) el.textContent = D.portfolio.title;
    el = document.getElementById("js-portfolio-subtitle");
    if (el) el.textContent = D.portfolio.subtitle;

    el = document.getElementById("js-portfolio-layout");
    if (el) {
      var thumbs = D.portfolio.thumbs
        .map(function (t) {
          return (
            "<figure><img src=\"" +
            esc(t.src) +
            "\" width=\"" +
            esc(t.width || "") +
            "\" height=\"" +
            esc(t.height || "") +
            "\" alt=\"" +
            esc(t.alt) +
            "\"></figure>"
          );
        })
        .join("");
      el.innerHTML =
        '<figure class="big">' +
        '<img src="' +
        esc(D.portfolio.main.src) +
        '" width="' +
        esc(D.portfolio.main.width || "") +
        '" height="' +
        esc(D.portfolio.main.height || "") +
        '" alt="' +
        esc(D.portfolio.main.alt) +
        '">' +
        "</figure>" +
        '<div class="small-grid">' +
        thumbs +
        "</div>";
    }

    el = document.getElementById("js-testimonial-text");
    if (el) el.textContent = D.testimonial.text;

    el = document.getElementById("js-cta-label");
    if (el) el.textContent = D.cta.label;

    el = document.getElementById("js-cta-address");
    if (el) {
      el.innerHTML =
        D.contact.addressHtml +
        " &nbsp;·&nbsp; " +
        esc(D.contact.officePhoneDisplay);
    }

    el = document.getElementById("js-cta-primary");
    if (el) {
      el.href = D.cta.primaryHref;
      el.textContent = D.cta.primaryLabel;
    }

    el = document.getElementById("js-cta-call");
    if (el) {
      el.href = "tel:" + esc(D.contact.officePhoneTel);
      el.innerHTML = ICON.phone18 + esc(" " + D.cta.callLabel);
    }

    el = document.getElementById("js-partners");
    if (el) el.innerHTML = renderPartnerStrip(D.partners);

    el = document.getElementById("js-footer-brand");
    if (el) el.textContent = D.meta.brandName;

    el = document.getElementById("js-footer-links");
    if (el) el.innerHTML = renderMenuList(D.menu);

    el = document.getElementById("js-footer-address");
    if (el) {
      el.innerHTML = D.contact.addressLines.map(function (line) {
        return esc(line);
      }).join("<br>");
    }

    el = document.getElementById("js-footer-phone");
    if (el) el.textContent = D.contact.officePhoneDisplay;

    el = document.getElementById("js-footer-social");
    if (el) el.innerHTML = renderSocial(D.social);

    el = document.getElementById("js-newsletter-email");
    if (el) el.placeholder = D.newsletter.placeholder;

    el = document.getElementById("js-newsletter-submit");
    if (el) el.textContent = D.newsletter.submitLabel;

    el = document.getElementById("js-footer-copy");
    if (el) el.textContent = D.copyright;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply);
  } else {
    apply();
  }
})();
