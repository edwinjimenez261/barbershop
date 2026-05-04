"""
Genera el PDF de propuesta para el dueno de Styles Barbershop 2.
Tema black & gold, en espanol, con precios personalizados.
"""
from reportlab.lib.pagesizes import LETTER
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT, TA_JUSTIFY
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table,
    TableStyle, PageBreak, NextPageTemplate
)
from datetime import date

INK = colors.HexColor("#0B0B0D")
INK_ELEV = colors.HexColor("#15161A")
GOLD = colors.HexColor("#C9A24B")
GOLD_DIM = colors.HexColor("#8C6F2E")
TEXT = colors.HexColor("#EAE7DC")
MUTED = colors.HexColor("#A39E92")
DIVIDER = colors.HexColor("#2A2B30")

OUTPUT = "/home/user/barbershop/demo/propuesta/Propuesta-Styles-Barbershop-2.pdf"

ss = getSampleStyleSheet()

H1 = ParagraphStyle("H1", parent=ss["Heading1"], fontName="Helvetica-Bold",
                    fontSize=26, leading=32, textColor=GOLD, spaceAfter=10)
H2 = ParagraphStyle("H2", parent=ss["Heading2"], fontName="Helvetica-Bold",
                    fontSize=16, leading=22, textColor=GOLD,
                    spaceBefore=18, spaceAfter=8)
H3 = ParagraphStyle("H3", parent=ss["Heading3"], fontName="Helvetica-Bold",
                    fontSize=12, leading=16, textColor=TEXT,
                    spaceBefore=10, spaceAfter=4)
BODY = ParagraphStyle("BODY", parent=ss["BodyText"], fontName="Helvetica",
                      fontSize=10.5, leading=15, textColor=TEXT,
                      alignment=TA_JUSTIFY, spaceAfter=8)
BULLET = ParagraphStyle("BULLET", parent=BODY, leftIndent=14, bulletIndent=2,
                        spaceAfter=4, alignment=TA_LEFT)
MUTED_S = ParagraphStyle("MUTED", parent=BODY, fontSize=9, textColor=MUTED,
                         spaceAfter=4)
COVER_TITLE = ParagraphStyle("CT", parent=H1, fontSize=38, leading=44,
                             alignment=TA_LEFT)
COVER_SUB = ParagraphStyle("CS", parent=BODY, fontSize=14, leading=20,
                           textColor=TEXT, alignment=TA_LEFT)
PRICE_BIG = ParagraphStyle("PB", parent=BODY, fontName="Helvetica-Bold",
                           fontSize=22, textColor=GOLD, alignment=TA_RIGHT,
                           leading=26)
PROMO_BODY = ParagraphStyle("PROMO", parent=BODY, textColor=INK,
                            alignment=TA_LEFT)


def page_bg(canv, doc):
    canv.saveState()
    canv.setFillColor(INK)
    canv.rect(0, 0, LETTER[0], LETTER[1], fill=1, stroke=0)
    canv.setStrokeColor(GOLD)
    canv.setLineWidth(1.2)
    canv.line(0.6 * inch, LETTER[1] - 0.6 * inch,
              LETTER[0] - 0.6 * inch, LETTER[1] - 0.6 * inch)
    canv.setFont("Helvetica-Bold", 9)
    canv.setFillColor(GOLD)
    canv.drawString(0.6 * inch, LETTER[1] - 0.45 * inch, "PROPUESTA")
    canv.setFillColor(MUTED)
    canv.setFont("Helvetica", 9)
    canv.drawRightString(LETTER[0] - 0.6 * inch, LETTER[1] - 0.45 * inch,
                         "Styles Barbershop 2")
    canv.setStrokeColor(DIVIDER)
    canv.setLineWidth(0.5)
    canv.line(0.6 * inch, 0.55 * inch,
              LETTER[0] - 0.6 * inch, 0.55 * inch)
    canv.setFillColor(MUTED)
    canv.setFont("Helvetica", 8.5)
    canv.drawString(0.6 * inch, 0.38 * inch,
                    "Edwin Jimenez | infinityproai.com")
    canv.drawRightString(LETTER[0] - 0.6 * inch, 0.38 * inch,
                         f"Pag. {doc.page}")
    canv.restoreState()


def cover_bg(canv, doc):
    canv.saveState()
    canv.setFillColor(INK)
    canv.rect(0, 0, LETTER[0], LETTER[1], fill=1, stroke=0)
    canv.setFillColor(GOLD)
    canv.rect(0, LETTER[1] - 1.6 * inch, 1.2 * inch, 1.6 * inch,
              fill=1, stroke=0)
    canv.setStrokeColor(GOLD)
    canv.setLineWidth(2)
    canv.line(0.6 * inch, 0.6 * inch,
              0.6 * inch, LETTER[1] - 1.8 * inch)
    canv.setFillColor(INK)
    canv.setFont("Helvetica-Bold", 14)
    canv.drawString(0.22 * inch, LETTER[1] - 1.0 * inch, "SB")
    canv.setFillColor(MUTED)
    canv.setFont("Helvetica", 9)
    canv.drawString(0.8 * inch, 0.45 * inch,
                    "Propuesta confidencial - preparada para Styles Barbershop 2")
    canv.restoreState()


def hr():
    t = Table([[""]], colWidths=[6.6 * inch], rowHeights=[0.02 * inch])
    t.setStyle(TableStyle([("LINEBELOW", (0, 0), (-1, -1), 0.6, GOLD_DIM)]))
    return t


def feature_card(title, body):
    cell = [
        [Paragraph(f"<b>{title}</b>", H3)],
        [Paragraph(body, BODY)],
    ]
    t = Table(cell, colWidths=[3.05 * inch])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), INK_ELEV),
        ("BOX", (0, 0), (-1, -1), 0.5, DIVIDER),
        ("LEFTPADDING", (0, 0), (-1, -1), 12),
        ("RIGHTPADDING", (0, 0), (-1, -1), 12),
        ("TOPPADDING", (0, 0), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
    ]))
    return t


def two_col(left, right):
    t = Table([[left, right]], colWidths=[3.25 * inch, 3.25 * inch])
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ]))
    return t


def build():
    doc = BaseDocTemplate(
        OUTPUT, pagesize=LETTER,
        leftMargin=0.6 * inch, rightMargin=0.6 * inch,
        topMargin=0.85 * inch, bottomMargin=0.7 * inch,
        title="Propuesta - Styles Barbershop 2",
        author="Edwin Jimenez",
    )
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height,
                  id="normal", leftPadding=0, rightPadding=0,
                  topPadding=0, bottomPadding=0)
    cover_frame = Frame(0.8 * inch, 0.8 * inch,
                        LETTER[0] - 1.6 * inch, LETTER[1] - 2.4 * inch,
                        id="cover", leftPadding=0, rightPadding=0,
                        topPadding=0, bottomPadding=0)
    doc.addPageTemplates([
        PageTemplate(id="cover", frames=[cover_frame], onPage=cover_bg),
        PageTemplate(id="content", frames=[frame], onPage=page_bg),
    ])

    story = []

    # ---------- COVER ----------
    story.append(Spacer(1, 1.2 * inch))
    story.append(Paragraph("Propuesta de<br/>plataforma digital", COVER_TITLE))
    story.append(Spacer(1, 0.2 * inch))
    story.append(Paragraph(
        "Sistema de reservas, pagos y renta de silla<br/>"
        "disenado a la medida para <b>Styles Barbershop 2</b>.",
        COVER_SUB))
    story.append(Spacer(1, 0.5 * inch))
    info = Table([
        ["Preparado para:", "Styles Barbershop 2"],
        ["Direccion:", "49 Warwick St, Newark, NJ"],
        ["Preparado por:", "Edwin Jimenez"],
        ["Fecha:", date.today().strftime("%d / %m / %Y")],
        ["Validez de la oferta:", "30 dias"],
    ], colWidths=[1.7 * inch, 3.8 * inch])
    info.setStyle(TableStyle([
        ("FONTNAME", (0, 0), (0, -1), "Helvetica-Bold"),
        ("FONTNAME", (1, 0), (1, -1), "Helvetica"),
        ("FONTSIZE", (0, 0), (-1, -1), 11),
        ("TEXTCOLOR", (0, 0), (0, -1), GOLD),
        ("TEXTCOLOR", (1, 0), (1, -1), TEXT),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("LINEBELOW", (0, 0), (-1, -1), 0.3, DIVIDER),
    ]))
    story.append(info)

    story.append(NextPageTemplate("content"))
    story.append(PageBreak())

    # ---------- 1. RESUMEN ----------
    story.append(Paragraph("1. Resumen ejecutivo", H2))
    story.append(hr())
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        "Vamos a construir para <b>Styles Barbershop 2</b> una plataforma "
        "digital completa que centraliza reservas, pagos, recordatorios y la "
        "cobranza automatica de la <b>renta de silla</b> de cada barbero. La "
        "barberia tendra su propio sitio web con dominio, un portal para usted "
        "como dueno y un portal independiente para cada barbero - todo "
        "bilingue (espanol/ingles) y optimizado para la realidad de la "
        "barberia hispana en EE.UU.",
        BODY))
    story.append(Paragraph(
        "El cliente reserva en menos de 60 segundos desde su telefono, paga un "
        "deposito del 25% que va <b>directo a la cuenta del barbero</b> "
        "(opcional - se puede activar despues), y recibe confirmacion y "
        "recordatorios por <b>WhatsApp</b>. Usted ve el negocio entero desde "
        "un panel y la renta semanal se cobra sola.",
        BODY))

    # ---------- 2. PROBLEMA ----------
    story.append(Paragraph("2. El problema que resolvemos", H2))
    story.append(hr())
    story.append(Spacer(1, 6))
    for b in [
        "<b>Citas perdidas por WhatsApp:</b> los mensajes se mezclan, no hay "
        "calendario claro y se duplican turnos.",
        "<b>No-shows sin costo:</b> el cliente no paga nada al reservar, asi "
        "que cancelar le sale gratis.",
        "<b>Renta de silla manual:</b> persiguiendo a cada barbero el viernes "
        "en efectivo o Cash App.",
        "<b>Cero datos:</b> no se sabe cuantos cortes hizo cada barbero, "
        "cuanto se factura, ni quien es el cliente recurrente.",
        "<b>Idioma:</b> los apps gringos (Booksy, Square) no hablan el espanol "
        "del barrio, y los clientes los abandonan.",
    ]:
        story.append(Paragraph(f"&bull; {b}", BULLET))

    # ---------- 3. QUE VAMOS A CONSTRUIR ----------
    story.append(PageBreak())
    story.append(Paragraph("3. Que vamos a construir", H2))
    story.append(hr())
    story.append(Spacer(1, 6))
    cards = [
        ("Sitio publico de la barberia",
         "Web propia bajo <b>stylesbarbershop2.com</b> con galeria, todos los "
         "barberos, servicios, precios, resenas y boton grande de Reservar. "
         "Disenado en negro y dorado, mobile-first."),
        ("Reserva en 5 pasos",
         "Servicio &rarr; Barbero &rarr; Fecha/Hora &rarr; Datos &rarr; "
         "Confirmacion. El cliente termina en menos de un minuto, sin crear "
         "cuenta."),
        ("Pago directo al barbero (opcional)",
         "Si lo activa, cada barbero conecta su cuenta de pagos en 3 minutos "
         "y el deposito del 25% cae en SU banco - usted nunca toca ese "
         "dinero. Si no, la cita queda confirmada sin deposito."),
        ("Renta de silla automatica (opcional)",
         "Usted define cuanto paga cada barbero (semanal o mensual). El "
         "cobro se hace solo y deposita a su cuenta. Se acabo el viernes de "
         "andar pidiendo. Tambien se puede manejar manual si prefiere."),
        ("WhatsApp + SMS bilingue",
         "Confirmacion al instante, recordatorio 24h y 2h antes. Si WhatsApp "
         "falla, cae a SMS automaticamente. El cliente cambia de idioma "
         "respondiendo &lsquo;EN&rsquo; o &lsquo;ES&rsquo;."),
        ("Portal del dueno",
         "Calendario maestro de todos los barberos, ingresos del dia/semana/mes, "
         "estado de la renta de cada silla, alertas de no-show, y exportacion "
         "a Excel/PDF para el contador."),
        ("Portal de cada barbero",
         "Calendario propio con drag & drop, sus citas, sus ingresos, su "
         "galeria. Los numeros de un barbero NO los ve otro."),
        ("Multi-idioma real",
         "Espanol neutro (no argentino, no de Espana) e ingles. Detecta el "
         "idioma del telefono del cliente automaticamente."),
    ]
    for i in range(0, len(cards), 2):
        l = feature_card(*cards[i])
        r = feature_card(*cards[i + 1]) if i + 1 < len(cards) else Spacer(1, 1)
        story.append(two_col(l, r))
        story.append(Spacer(1, 10))

    # ---------- 4. CRONOGRAMA ----------
    story.append(PageBreak())
    story.append(Paragraph("4. Cronograma de entrega", H2))
    story.append(hr())
    story.append(Spacer(1, 6))

    CELL = ParagraphStyle("CELL", parent=BODY, fontSize=9.5, leading=13,
                          alignment=TA_LEFT, spaceAfter=0)
    CELL_BOLD_GOLD = ParagraphStyle("CELLBG", parent=CELL,
                                    fontName="Helvetica-Bold",
                                    textColor=GOLD)
    CELL_TIME = ParagraphStyle("CELLT", parent=CELL, alignment=TA_CENTER)
    HEAD = ParagraphStyle("HEAD", parent=CELL,
                          fontName="Helvetica-Bold", textColor=INK,
                          alignment=TA_LEFT)
    HEAD_C = ParagraphStyle("HEADC", parent=HEAD, alignment=TA_CENTER)

    cron = [
        [Paragraph("Fase", HEAD),
         Paragraph("Entregables", HEAD),
         Paragraph("Tiempo", HEAD_C)],
        [Paragraph("Fase 1 - Fundacion", CELL_BOLD_GOLD),
         Paragraph("Diseno final, dominio, sitio publico, reservas con "
                   "deposito (opcional), WhatsApp configurado, barberos "
                   "cargados.", CELL),
         Paragraph("Sem. 1-2", CELL_TIME)],
        [Paragraph("Fase 2 - Portales", CELL_BOLD_GOLD),
         Paragraph("Portal del dueno, portal de cada barbero, recordatorios "
                   "automaticos 24h/2h, galerias.", CELL),
         Paragraph("Sem. 3-4", CELL_TIME)],
        [Paragraph("Fase 3 - Renta de silla<br/>(opcional)", CELL_BOLD_GOLD),
         Paragraph("Conexion de pagos de cada barbero, cobro automatico "
                   "semanal y reporte de pagos para usted. Solo si decide "
                   "activarlo.", CELL),
         Paragraph("Sem. 5", CELL_TIME)],
        [Paragraph("Fase 4 - Lanzamiento", CELL_BOLD_GOLD),
         Paragraph("Migracion de clientes, capacitacion (1h por barbero + "
                   "2h con usted), QR codes en el local, soporte intensivo "
                   "de 2 semanas.", CELL),
         Paragraph("Sem. 6", CELL_TIME)],
    ]
    t = Table(cron, colWidths=[1.5 * inch, 3.8 * inch, 1.2 * inch])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), GOLD),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [INK_ELEV, INK]),
        ("GRID", (0, 0), (-1, -1), 0.4, DIVIDER),
        ("LEFTPADDING", (0, 0), (-1, -1), 9),
        ("RIGHTPADDING", (0, 0), (-1, -1), 9),
        ("TOPPADDING", (0, 0), (-1, -1), 9),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    story.append(t)
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        "<i>Total: <b>6 semanas</b> de la firma al dia del lanzamiento, con "
        "demos al final de cada fase.</i>", MUTED_S))

    # ---------- 5. INVERSION ----------
    story.append(PageBreak())
    story.append(Paragraph("5. Inversion - su version", H2))
    story.append(hr())
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        "Plataforma completa para Styles Barbershop 2 con <b>barberos "
        "ilimitados</b>, dominio propio, WhatsApp, renta de silla "
        "automatica (opcional) y soporte prioritario.",
        BODY))
    story.append(Spacer(1, 8))

    setup = Table([[
        Paragraph("<b>Setup unico</b><br/>"
                  "<font size=9 color='#A39E92'>"
                  "Diseno + desarrollo + dominio + capacitacion + migracion "
                  "+ 2 semanas de soporte intensivo."
                  "</font>", BODY),
        Paragraph("<b>$1,295</b><br/>"
                  "<font size=9 color='#A39E92'>un solo pago</font>",
                  PRICE_BIG),
    ]], colWidths=[4.4 * inch, 2.1 * inch])
    setup.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), INK_ELEV),
        ("BOX", (0, 0), (-1, -1), 1.2, GOLD),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 14),
        ("RIGHTPADDING", (0, 0), (-1, -1), 14),
        ("TOPPADDING", (0, 0), (-1, -1), 16),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 16),
    ]))
    story.append(setup)
    story.append(Spacer(1, 12))

    monthly = Table([[
        Paragraph("<b>Mensualidad</b><br/>"
                  "<font size=9 color='#A39E92'>"
                  "Barberos ilimitados &middot; WhatsApp &middot; renta de "
                  "silla automatica &middot; soporte &middot; hosting "
                  "&middot; SMS y WhatsApp incluidos hasta 1,000/mes."
                  "</font>", BODY),
        Paragraph("<b>$95/mes</b>", PRICE_BIG),
    ]], colWidths=[4.4 * inch, 2.1 * inch])
    monthly.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), INK_ELEV),
        ("BOX", (0, 0), (-1, -1), 1.2, GOLD),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 14),
        ("RIGHTPADDING", (0, 0), (-1, -1), 14),
        ("TOPPADDING", (0, 0), (-1, -1), 16),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 16),
    ]))
    story.append(monthly)
    story.append(Spacer(1, 14))

    story.append(Paragraph("Lo que <b>NO</b> cobramos", H3))
    for b in [
        "<b>0% comision</b> sobre los pagos de los clientes - el dinero del "
        "barbero es del barbero.",
        "<b>0%</b> de la renta de silla - lo que pague el barbero le llega "
        "completo a usted (menos la comision del procesador de pagos del "
        "2.9% si activa el cobro automatico).",
        "<b>Sin contrato anual</b> - si no le sirve, cancela y listo.",
    ]:
        story.append(Paragraph(f"&bull; {b}", BULLET))
    story.append(Spacer(1, 10))

    promo = Table([[Paragraph(
        "<b>PRECIO FAMILIA</b><br/>"
        "El costo real de un proyecto asi es <b>$1,800 de setup</b> y "
        "<b>$195/mes</b>. Por ser familia y por la confianza, le dejo:<br/>"
        "&bull; Setup: <b>$1,800 &rarr; $1,295</b><br/>"
        "&bull; Mensualidad: <b>$195 &rarr; $95/mes</b><br/>"
        "Estos precios son exclusivos para Styles Barbershop 2.",
        PROMO_BODY)]], colWidths=[6.5 * inch])
    promo.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), GOLD),
        ("LEFTPADDING", (0, 0), (-1, -1), 16),
        ("RIGHTPADDING", (0, 0), (-1, -1), 16),
        ("TOPPADDING", (0, 0), (-1, -1), 14),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 14),
    ]))
    story.append(promo)

    # ---------- 6. ROI ----------
    story.append(PageBreak())
    story.append(Paragraph("6. Como se paga solo", H2))
    story.append(hr())
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        "Calculo conservador para Styles Barbershop 2:", BODY))
    roi = [
        ["Concepto", "Sin sistema", "Con el sistema", "Diferencia"],
        ["No-shows por semana (estimado)", "8 - 12", "1 - 2", "+$280 - $400"],
        ["Tiempo cobrando renta (semana)", "2 - 3 horas", "0", "+3 horas"],
        ["Reservas fuera de horario", "se pierden", "24/7", "+$150 - $250"],
        ["Cliente nuevo via Google Maps", "manual", "click directo",
         "+5 - 10/sem"],
        ["GANANCIA NETA APROX. / MES", "", "", "+$1,800 - $2,800"],
    ]
    t = Table(roi, colWidths=[2.4 * inch, 1.4 * inch, 1.4 * inch, 1.4 * inch])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), GOLD),
        ("TEXTCOLOR", (0, 0), (-1, 0), INK),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, -1), 10),
        ("TEXTCOLOR", (0, 1), (-1, -2), TEXT),
        ("ROWBACKGROUNDS", (0, 1), (-1, -2), [INK_ELEV, INK]),
        ("BACKGROUND", (0, -1), (-1, -1), GOLD_DIM),
        ("TEXTCOLOR", (0, -1), (-1, -1), INK),
        ("FONTNAME", (0, -1), (-1, -1), "Helvetica-Bold"),
        ("GRID", (0, 0), (-1, -1), 0.4, DIVIDER),
        ("ALIGN", (1, 0), (-1, -1), "CENTER"),
        ("LEFTPADDING", (0, 0), (-1, -1), 9),
        ("RIGHTPADDING", (0, 0), (-1, -1), 9),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    story.append(t)
    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "Con la mensualidad de <b>$95</b>, el sistema se paga solo evitando "
        "<b>una sola cita perdida al mes</b>. Todo lo demas es ganancia.",
        BODY))

    # ---------- 7. PROXIMOS PASOS ----------
    story.append(Paragraph("7. Proximos pasos", H2))
    story.append(hr())
    story.append(Spacer(1, 6))
    for s in [
        "<b>1. Aprobacion verbal</b> - me dice si esta bien y arrancamos.",
        "<b>2. Adelanto del 50% del setup</b> ($648) - reservo el slot de "
        "desarrollo.",
        "<b>3. Sesion de kickoff de 1 hora</b> - definimos colores finales, "
        "fotos, servicios y precios.",
        "<b>4. Demo de la Fase 1</b> a las 2 semanas - usted prueba el sitio "
        "antes de pagar el resto.",
        "<b>5. Saldo del setup</b> al lanzar ($647).",
        "<b>6. Mensualidad</b> empieza el dia del lanzamiento ($95/mes).",
    ]:
        story.append(Paragraph(f"&bull; {s}", BULLET))

    story.append(Spacer(1, 16))
    sign = Table([
        [Paragraph("<b>Acepto la propuesta</b>", H3),
         Paragraph("<b>Por el desarrollador</b>", H3)],
        [Paragraph("_______________________________<br/><br/>"
                   "Nombre y firma - Styles Barbershop 2<br/>"
                   "Fecha: ____ / ____ / 2026", BODY),
         Paragraph("_______________________________<br/><br/>"
                   "Edwin Jimenez | infinityproai.com<br/>"
                   "Fecha: ____ / ____ / 2026", BODY)],
    ], colWidths=[3.25 * inch, 3.25 * inch])
    sign.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 12),
        ("TOPPADDING", (0, 0), (-1, -1), 10),
    ]))
    story.append(sign)

    story.append(Spacer(1, 12))
    note = Table([[Paragraph(
        "<b>Para comenzar se necesita el 50% de adelanto del setup "
        "($648).</b> Una vez recibido, agendamos el kickoff y arrancamos "
        "con la Fase 1. &iquest;Preguntas? Edwin Jimenez | infinityproai.com "
        "&middot; WhatsApp directo. Propuesta valida por 30 dias.",
        PROMO_BODY)]], colWidths=[6.5 * inch])
    note.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), GOLD),
        ("LEFTPADDING", (0, 0), (-1, -1), 16),
        ("RIGHTPADDING", (0, 0), (-1, -1), 16),
        ("TOPPADDING", (0, 0), (-1, -1), 12),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
    ]))
    story.append(note)

    doc.build(story)
    print(f"OK: {OUTPUT}")


if __name__ == "__main__":
    build()
