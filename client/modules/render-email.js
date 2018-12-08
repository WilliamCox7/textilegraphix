export default function renderEmail(form, products) {

  let subtotal = products.reduce((t, prod) => t += Number(prod.total), 0);
  let tax =  subtotal * (form.taxExempt ? 0 : 0.06);
  let total = subtotal + tax;

  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
  <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Textile Graphix Confirmation</title>
      <style>
        @import url('https://fonts.googleapis.com/css?family=Open+Sans');
        body, table, thead, tbody, tr, td, img {
          padding: 0;
          margin: 0;
          border: none;
          border-spacing: 0px;
          border-collapse: collapse;
          vertical-align: top;
        }
        h1, h2, h3, h4, h5, h6, p {
          margin: 0;
          padding: 0;
          padding-bottom: 20px;
          line-height: 1.6;
          font-family: 'Open Sans', sans-serif;
        }
        p, a, li {
          font-family: 'Open Sans', sans-serif;
        }
        img {
          display: block;
        }
        @media only screen and (max-width: 620px) {
          .wrapper .section {
            width: 100%;
          }
          .wrapper .column {
            width: 100%;
            display: block;
          }
        }
      </style>
    </head>
    <body>
      <table width="100%">
        <tbody>
          <tr>
            <td class="wrapper" width="680" align="center">

              <!-- Header image -->
              <table class="section header" cellpadding="0" cellspacing="0" width="680">
                <tr>

                  <td class="column">
                    <table>
                      <tbody>
                        <tr>
                          <td align="left">
                            <img style="width: 325px" src="https://lh3.googleusercontent.com/baG6TwpnPAVukPEp3lZf4x5jpI4Vd0by_uZ3S4DlI4eWvKsxDVpMyTthjBNrRPOe2MzCMHL7NLXiOxtS4twIKg7OUHl9BLMjS8gTD-okXZejuNaOrlSMCdIbOH5UoARhyf5PuC0eVC8B4OWR4XpFapgQDaxkWBAwhOMd5RMgkNakdoNv6n7jhOZ0kIrSPLouy_rRliAxbwQ24jGddz2Lc1hHcW9CAjRX4BTPIVHiZNpGu4VAmK7TbKFvvcNxdS7V6WYTgwbhy7o4VZ9QEZS3JSKasy2lG0v1YdLlEEAyFX5v8jxWjjkR79foKDsCEqzC-iB37tgzyDPm6oRDDLYjJj1FYku6o2v7tqP0-5v7xJHFIDKoeDfcD8zXu0297zIXD0R_g7wU10R_O67hD_2DDISpmJGKIHls2AitoTtVrJaLrxUYbs_qyusFrH5CQCvpXF-0Rs-y55VO4To7YqVYJ7Pqu_ptOeqWrFa-08H1gY-qkhErsmY9_NF-1JE2jS7YdbFMGDr_M9smaPqw5KSdbZX-O0gLsaw1fkuhRBZSVWCIdQ2h8r83dOT9Sx_cyuwH9p5YCzJkJhTmgpphxGRIDERoZJsKGlvV=w725-h954" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>

                  <td class="column" align="right">
                    <table>
                      <tbody>
                        <tr>
                          <td align="right">
                            <div style="font-weight: bold; font-size: 18px">Order #: <span style="color: #44B1DE">${form.guid}</span></div>
                            <div style="font-weight: bold; font-size: 18px">ORDER CONFIRMATION</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>

                </tr>
              </table>

              <hr style="border: none; border-bottom: solid 1px #A0A0A0; margin: 20px 0px; max-width: 680px">
              <div style="font-size: 30px; font-weight: bold; margin-bottom: 10px; max-width: 680px; text-align: left">Hello ${form.billing.first} ${form.billing.last},</div>
              <p style="font-size: 24px; line-height: 33px; margin-bottom: 20px; max-width: 680px; text-align: left">
                Your order has been successfully placed. You’ll find all the details about your order below,
                and we’ll send you a shipping confirmation email as soon as your order ships! Thanks again!
              </p>
              <div style="font-size: 30px; font-weight: bold; margin-bottom: 5px; max-width: 680px; text-align: left">Details</div>
              <hr style="border: none; border-bottom: solid 1px #A0A0A0; margin: 5px 0px 20px; max-width: 680px">
              <div style="font-weight: bold; font-size: 24px; margin-bottom: 20px; max-width: 680px; text-align: left">Order #: <span style="color: #44B1DE">${form.guid}</span></div>

              <div style="padding: 20px; border-radius: 5px; box-shadow: 0px 3px 6px #00000029; -webkit-box-shadow: 0px 3px 6px #00000029; border: solid 1px #DEDEDE; max-width: 640px">

                <!-- Two columns -->
                <table class="section" cellpadding="0" cellspacing="0">
                  <tr>

                    <td class="column" width="400" valign="top">
                      <table width="100%">
                        <tbody>
                          <tr>
                            <td align="left">
                              <div style="font-size: 24px; font-weight: bold; margin-bottom: 15px">Estimated Ship Date:</div>
                              <div style="font-size: 24px; font-weight: bold; margin-bottom: 15px"><span style="color: #44B1DE">${form.delivery}</span> <span style="font-size: 14px; margin-top: 8px">${(() => {
                                if (form.selectedShippingMethod === 'ground') return 'FREE (UPS GROUND)';
                                else if (form.selectedShippingMethod === '3-day') return '+$26 (UPS 3-DAY)';
                                else if (form.selectedShippingMethod === '2-day') return '+$70 (UPS 2-DAY)';
                                else if (form.selectedShippingMethod === 'next-day') return '+$180 (UPS NEXT-DAY)';
                              })()}</span></div>
                              <div style="font-size: 14px; line-height: 19px; max-width: 250px; margin-bottom: 24px">
                                *A shipping confirmation email will be sent as soon as your order ships
                              </div>
                              <a href="${process.env.HOST}/view/${form.guid}" style="text-decoration: none">
                                <div style="white-space: nowrap; background: #68DBAA; max-width: 100%; text-align: center; box-shadow: 0px 3px 6px #00000029; -webkit-box-shadow: 0px 3px 6px #00000029; border-radius: 5px; padding: 30px; color: white; font-size: 26px">VIEW ORDER</div>
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>

                    <td class="column" width="40" height="40" valign="top">
                      <table>
                        <tbody>
                          <tr>
                            <td> &nbsp; </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>

                    <td class="column" width="280" valign="top">
                      <table width="100%">
                        <tbody>
                          <tr>
                            <td align="left">
                              <div style="font-size: 24px; font-weight: bold; margin-bottom: 15px">Shipping Address</div>
                              <div style="font-size: 18px">${form.shipping.first} ${form.shipping.last}</div>
                              <div style="font-size: 18px">${form.shipping.address}</div>
                              <div style="font-size: 18px">${form.shipping.city}, ${form.shipping.state} ${form.shipping.zip}</div>
                              <div style="padding: 10px">
                                <table border="0" cellpadding="0" cellspacing="0" style="margin: 0; padding: 0" width="100%" class="mob-column">
                                  <tr>
                                    <td align="left" valign="top" style="font-size: 20px; font-weight: bold">Subtotal</td>
                                    <td align="right" valign="top" style="font-size: 20px; font-weight: bold">$${subtotal.toFixed(2)}</td>
                                  </tr>
                                  <tr>
                                    <td align="left" valign="top" style="font-size: 20px; font-weight: bold">Tax</td>
                                    <td align="right" valign="top" style="font-size: 20px; font-weight: bold">$${tax.toFixed(2)}</td>
                                  </tr>
                                </table>
                              </div>
                              <div style="padding: 10px; border-radius: 5px; background: #44B1DE; color: white">
                                <table border="0" cellpadding="0" cellspacing="0" style="margin: 0; padding: 0" width="100%">
                                  <tr>
                                    <td align="left" valign="top" style="font-size: 20px; font-weight: bold">Subtotal</td>
                                    <td align="right" valign="top" style="font-size: 20px; font-weight: bold">$${total.toFixed(2)}</td>
                                  </tr>
                                </table>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>

                  </tr>
                </table>

              </div>

            </td>
          </tr>
        </tbody>
      </table>

      <div style="background: #DEDEDE; text-align: center; padding: 15px 30px; margin-top: 40px">
        <img style="width: 325px; margin: auto" src="https://lh3.googleusercontent.com/baG6TwpnPAVukPEp3lZf4x5jpI4Vd0by_uZ3S4DlI4eWvKsxDVpMyTthjBNrRPOe2MzCMHL7NLXiOxtS4twIKg7OUHl9BLMjS8gTD-okXZejuNaOrlSMCdIbOH5UoARhyf5PuC0eVC8B4OWR4XpFapgQDaxkWBAwhOMd5RMgkNakdoNv6n7jhOZ0kIrSPLouy_rRliAxbwQ24jGddz2Lc1hHcW9CAjRX4BTPIVHiZNpGu4VAmK7TbKFvvcNxdS7V6WYTgwbhy7o4VZ9QEZS3JSKasy2lG0v1YdLlEEAyFX5v8jxWjjkR79foKDsCEqzC-iB37tgzyDPm6oRDDLYjJj1FYku6o2v7tqP0-5v7xJHFIDKoeDfcD8zXu0297zIXD0R_g7wU10R_O67hD_2DDISpmJGKIHls2AitoTtVrJaLrxUYbs_qyusFrH5CQCvpXF-0Rs-y55VO4To7YqVYJ7Pqu_ptOeqWrFa-08H1gY-qkhErsmY9_NF-1JE2jS7YdbFMGDr_M9smaPqw5KSdbZX-O0gLsaw1fkuhRBZSVWCIdQ2h8r83dOT9Sx_cyuwH9p5YCzJkJhTmgpphxGRIDERoZJsKGlvV=w725-h954" />
        <hr style="border: none; border-bottom: solid 1px #A0A0A0">
        <div style="font-size: 9px; margin-bottom: 4px">Copyright 2018. Textile Graphix, LLC</div>
        <table border="0" cellpadding="0" cellspacing="0" style="margin: 0; padding: 0" width="100%">
          <tr>
            <td align="right" valign="top" height="20px" style="width: 50%">
              <a href="https://www.facebook.com/textilegraphix/" target="_blank">
                <img style="margin-right: 10px" src="https://lh3.googleusercontent.com/wJrRG9TbOjQVwnTN_svaavwxbGckIfFH5TC9kaKt3b7BoUAdo2SNq-FqKTW2BBSQuQ4BxYZxA70ob5BpENG54yI4lVZqUn70IJZh4TJNO_RUh68_gogbknamN7PWibBHUq01r7lShtxHszd5smPtLUUY9R0B_dkdoVmqBkhhu-iGNPUTcOejIkwYFeepWjddE9h_i049hBSqTEECOBV_ESEtsvYrMJFyC4mcy610qW5opaJC18Ru55cJp89vrx53UjPinJeUh8TYWbJ84zo6FWbqDArjuPRDErEA2TzE-baoENXnNMpyl9dlp2KePMw1ZLDdqtyDYyb-wX6PsKQyXMX3_95PiSWz9kkBiZlgt7qou4HVeuW6mxGJK48-6PzcArL6Hs6imw5q7vOB33K3uMpn3B5bBiGRvYcavtA3yDyf9YsRgKFdE4Jn0ibI9hcMJsK9uqGT9k8vgCFelOVltEBqVaE63WlZc33lIShY3cHEC9U4zwNGNtom0Yo1e2Qq0fJOn-a1oUNSb3AM3-FR489V81CYW04VurayIzC3H43MQQubJytUDNVQGiJ4x14VfvDye9RXYDzxRhYTsslAYVRhcXcA0cfG=w1920-h970" />
              </a>
            </td>
            <td width="20px"></td>
            <td align="left" valign="top" height="20px" style="width: 50%">
              <a href="https://www.instagram.com/textilegraphix/" target="_blank">
                <img style="margin-left: 10px" src="https://lh3.googleusercontent.com/7mNJxWGoPurWZ20f8_uZEHPuHyppxd6mYP3f0TWSfy7-qMc_68ZZSEhDlNgvhEvMGwFf92E5CT1fL-PwrMh_vPfnu3jFfv8L_iiV1Xv7rCdFYe_Gj4838XP9MeJ8DM6n3OIzmdi4D3G803K0BFyXlMxP6NDxExZiCnBhGrnR3IGDCvaWa3D8K15P3Q1EmzFRaJM8ydTMqLUjOoPvHe6mvKjExJ1yp3X58hRXpg3ed2RSVdTGd1f68ZHrOKoqW5yM8D3j7nEAjYBTYugG4WG2haYAxdUs2QW77dxjTX5cxk9BaqHTYZNGMWXxXid6NCQtrZzfY3Pc5wtcucUrdTYl-MsNIh3F14H5UC9g_rKug3Sa21_tZ0tQmw426fHunWe-xd74Ie2JiVDdELEepCJzM1ZcP9_bsBoVLKipsEDPbrxiF2rAPACBHuerMvmOGw0pqoFCFwmoeSG16QGCoppejVeRZv9RVyApmo8y_y0hdTjIFvu78qZFNiJb4Ig66i3wq_Yp54K14qPAtOdjfnBxPbnVNwn_42JA7YTJmfWaaGDtcuaIESXEVxQLRIgZmErQiS6pnVjjO4tiyPHHc6xLQBWMuZws0uhc=w725-h954" />
              </a>
            </td>
          </tr>
        </table>
      </div>

    </body>
  </html>
  `;
}
