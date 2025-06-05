
## 🧾 Resume PDF Generator using WeasyPrint

This project dynamically creates beautiful PDF resumes using **HTML + CSS** rendered by **WeasyPrint**.
---
#### 🔹 `@page` Rule

```css
@page {
  margin: 0;
  size: A4;
}
```

##### What is `@page`?

* It is a **CSS at-rule** used specifically for **printed documents / PDF outputs**.
* Supported by **PDF engines** like WeasyPrint, PrinceXML, etc.
* Used to **control** the **paper size** and **outer margins** (not the body margins!).

---

### 📏 Effects of `@page`

#### ❌ Before (`@page` not set or default):

* PDF shows **extra space** (margin) around the resume.
* Each page size is **A4 by default** (210mm x 297mm), but browser/PDF engine adds unwanted padding.

#### ✅ After (`@page { margin: 0; size: A4; }`):

* **No extra margins** on top, left, right, or bottom.
* **Each page is clearly A4-sized**, and fully under your CSS control.

#### 🧪 Example: Custom Page Size

```css
@page {
  margin: 0;
  size: 1024px 1024px;
}
```

* Sets **each PDF page** to square (1024x1024).
* ⚠️ May show **extra white space** if your layout doesn’t fill the new dimensions.

### Always for FastAPI use "Depends" it works like middleware but as well as it send the output of middleware function to the argument of current router function