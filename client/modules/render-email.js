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
          width: 100%;
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
                            <img style="width: 325px" src="https://lh3.googleusercontent.com/HeST23zeHNNrSxiGrQnmlihWlmedBsIiNJjeI2ca44szVBGw0vUGmarMjkU4gvMCvNw7E2lfsaeB03dAGPrzPPmrVfbkl3YhMo_qHRm_CB-TlYoQ3sbYeT-IB7xND7YN4thSQ-H3q4y_eoMW31x4fhkr9HMvszCNvWuQ6oaVH82mY1dTV9dL8P8zu-ipRwyrKFUfqQH-R9TXpC2j77X2qijPeUjD9bcW0mKcY_NpUawk5rgIR74JauE8_RSZgByEgmdkp_9gtrO-0PNXIl18okEnQHs7w8OB7a0cRhUu_kO3-JnR_qsZzGgM8Aw34GiynAu37oznZ0Eb2gQecnrEdyAc46mbXcK3CClvLzMXxsSgB3kEbi0cyxI2QIcAV2BkZ4ClHVcFsuR_Z_UYJenG4x1YuOgsiWHEuMpZ5-SKGHzGFuMvASVAx8IX6dyNXiwXFWVusjhJvEUvBAfhLV-MKReaoNsTe1OGx8A9jDCk7Bv5GRBPj41AMvHfOHDnpQIeOk6pehvNbrNiv5YBz1FZ6CIc6c6l-i32Eh5H2efbmOZuARCjk7Fg6ax-xHVgQHEo967W6s_CH1oxkIxs3KFHpXInbBuO0VLe=w200-h150-p-k-nu" />
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
        <img style="width: 325px; margin: auto" src="https://lh3.googleusercontent.com/HeST23zeHNNrSxiGrQnmlihWlmedBsIiNJjeI2ca44szVBGw0vUGmarMjkU4gvMCvNw7E2lfsaeB03dAGPrzPPmrVfbkl3YhMo_qHRm_CB-TlYoQ3sbYeT-IB7xND7YN4thSQ-H3q4y_eoMW31x4fhkr9HMvszCNvWuQ6oaVH82mY1dTV9dL8P8zu-ipRwyrKFUfqQH-R9TXpC2j77X2qijPeUjD9bcW0mKcY_NpUawk5rgIR74JauE8_RSZgByEgmdkp_9gtrO-0PNXIl18okEnQHs7w8OB7a0cRhUu_kO3-JnR_qsZzGgM8Aw34GiynAu37oznZ0Eb2gQecnrEdyAc46mbXcK3CClvLzMXxsSgB3kEbi0cyxI2QIcAV2BkZ4ClHVcFsuR_Z_UYJenG4x1YuOgsiWHEuMpZ5-SKGHzGFuMvASVAx8IX6dyNXiwXFWVusjhJvEUvBAfhLV-MKReaoNsTe1OGx8A9jDCk7Bv5GRBPj41AMvHfOHDnpQIeOk6pehvNbrNiv5YBz1FZ6CIc6c6l-i32Eh5H2efbmOZuARCjk7Fg6ax-xHVgQHEo967W6s_CH1oxkIxs3KFHpXInbBuO0VLe=w200-h150-p-k-nu" />
        <hr style="border: none; border-bottom: solid 1px #A0A0A0">
        <div style="font-size: 9px; margin-bottom: 4px">Copyright 2018. Textile Graphix, LLC</div>
        <table border="0" cellpadding="0" cellspacing="0" style="margin: 0; padding: 0" width="100%">
          <tr>
            <td align="right" valign="top" height="20px">
              <img style="height: 100%" src="https://lh3.googleusercontent.com/_cDHhO4gEXuVspjTHQkCBbGhnNI6UzZmVrLQINbIf3BKAyeXq3pNMx5QESclDB8cTjvlAKrbClelFXbjjsaLRo7HDQoSts93LjFr2tuZLEB9lIKUT2vZ58SNNyylMQzOtk0oeC8RaNxMshyi9xYW1lA0ZqMu1QYR07n52VFnxZSI7G7DDkwi9yGOW87koaDrtcOGO25vSBr7ppqtl2wQlz5LHD6jEyruIvtO67DhmZV80u4f83UHKqasGQJTP_W4EGX2naIsoMFT_bnXlMT2HKgsP2DWW0qKYpW3c-a_JP5BMIrzatzGedfsyXmneWFtqNIOo8nZIzSrltx3o2l9ADpJPCCruHb52KiEesalAh0Xmf1MIiTDupm84PP_EZP6jOvLyOutQJqnXLTxftn5nzNSckfLjcFFstsy1zSQgMhRzgfelroELPEmGLf6LxXDg9OtMBnJqYqOJwZiLe15vd_irBncqdesw1glt6epLc3dfJ7XHDH7ImWPxdj_7EIlFQ9VsakFFlEXdau7nJVmoXNdSSOmUrZ1jrZ6d7b8WExgCriTmXt5zGVpMuwndXd7QL3gnflKMUX5e7jz1g47EIl3BzxtyJFR=w200-h150-p-k-nu" />
            </td>
            <td width="20px"></td>
            <td align="left" valign="top" height="20px">
              <img style="height: 100%" src="https://lh3.googleusercontent.com/_9h_3LyvsofTBpNKMi-baxRr9VhB1tp3vf85g9e7IgK7fmyFD_V0u9XnpYtGIw5Vas_jpBTIzztXUM0TXIOX65g8WZL-NcIYri28TJwXzsIKBxf4FJ82Bw0x8fZgGn24jEPkwgujulZvU7oiD6GT0xmBIu5_mdKB7LRoITSRDpUFkEQ_geLaeUabyZeaOOurWK1SH5ToAfN4tR_O4tTra2vXwTBnXiGjXEH5V3Q5-UT-LQp8MjMG_sy5vECVKxRYxkKZLUzonrigywzb4U8xuTrTsm2x_LPae0knYlDkwCR2_r6y3vQVFXYZnGW1gXopGHducF3uYJ9TCvjpsjJhnPI2P0exXPLzMFeZZoLFowXc4skPBYbV1oFlGLF_9zeb4bYnEpUl8_oQI0ujLNEyo4L4UAcdzNULQJS4-Mi_x3J3SAxHizMeuvMabL-kIPhyXHBCdqMpm6Ep66FWqk3KLeSp5wdHSF_N4mfmCC3w_gC2gQhsdoxzBJLOmYPR_N24AtYjpUjo6tMau26SLFUhg5aE890TZsbSfziJWuOTqrbhQkVmxMa4U7MOhMJP8CzYWuuy2sUGtuR-EJI86RkB-xyQxJgLXZLf=w200-h150-p-k-nu" />
            </td>
          </tr>
        </table>
      </div>

    </body>
  </html>
  `;
}
