<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet">
    <title>Invoice Table</title>
    <style>
        body {
            font-family: "Poppins", sans-serif;
        }

        table {
            font-size: 15px;
            text-align: left;
        }

        th,
        td {
            border: 1px solid #ddd;
            padding: 10px;
        }

        th {
            background-color: #f4f4f4;
        }
    </style>
</head>

<body>
    <div class="invoice-main">
        <table style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="border:none; padding:2px 0px; font-size:12px; width:300px;">{{ date('n/j/y, g:i A', strtotime($invoice['created_at'])) }}</td>
                <td style="border:none; padding:2px 0px; font-size:12px;">Invoice</td>
            </tr>
        </table>

        <table style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="padding: 10px 10px;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="border:none; padding:5px 0px;">
                                <img src="{{ $image }}" style="max-width: 220px;">
                            </td>
                        </tr>
                    </table> <strong>SK LIFE</strong> <table
                        style="width: 100%; border-collapse: collapse; border-bottom: solid 3px #000; margin-bottom: 20px;">
                        <tr>
                            <td style="border:none; padding: 0px 20px 0px 0px;">
                                <table style="width: 100%; border-collapse: collapse;">
                                    <tr>
                                        <td style="border:none; padding:4px 0px;">
                                            <strong>Registered Office:</strong> Block B 08 Flat 906 Gulmarg parisar Badiya kima, bicholi mardana, indore 452016
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="border:none; padding:4px 0px;">
                                            <strong>Email:</strong> shyampatidar2986@gmail.com
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="border:none; padding:4px 0px;">
                                            <strong>Website:</strong> https://sklife.in
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="border:none; padding:4px 0px;">
                                            <strong>GST:</strong> 23DBTPP9710D2ZE
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            <td style="border:none; padding:2px 0px; text-align:center;">
                            <strong style="padding-bottom:2px;">DELHIVERY</strong>
                            {!! DNS1D::getBarcodeHTML($invoice['waybill'], 'C128', 2, 50) !!}
                            <div style="padding-top:4px;">{{ $invoice['waybill'] }}</div>
                            </td>
                        </tr>
                    </table>
                    <table style="width: 100%; border-collapse: collapse; margin-bottom:30px;">
                        <tr>
                            <td style="border:none; padding: 0px 20px 0px 0px; width:300px;">
                                <table style="width: 100%; border-collapse: collapse;">
                                    <tr>
                                        <td style="border:none; padding:4px 0px;">
                                            <strong>Invoice To : {{ $order['name'] }}</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="border:none; padding:4px 0px;">
                                            <strong>Address:</strong> {{ $order['address'] }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="border:none; padding:4px 0px;">
                                            <strong>Contact No:</strong> {{ $order['phone_number'] }}
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            <td style="border:none; padding:0px; vertical-align: top;">
                                <table style="width: 100%; border-collapse: collapse; text-align: right;">
                                    <tr>
                                        <td style="border:none; padding:1px 0px;">
                                            <strong>Invoice No :</strong> {{ $invoice['invoice_number'] }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="border:none; padding:1px 0px;">
                                            <strong>Invoice Date :</strong> {{ date('d-m-Y', strtotime($invoice['invoice_date']))  }}
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 50px;">
                        <thead>
                            <tr>
                                <th>S No.</th>
                                <th>Description of Work</th>
                                <th style="text-align:right;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAALxCAQAAACAv9bNAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAC5VSURBVHja7Z13tFX1te+/c9GlFylSBVS6IL0JKgjYogRQk1iSWF5icq95vtzc3Pvyxn3XcUuSa25euunRWBFiohGkiPR2EEURsACCgihFBKXv+f44Ettp+5x9dJ01Px/HcAxB9mGW33fNOfdac0kAAAAAABAIq7ZP7mFrVR8HA6Ty4E/PTatOAUhssUbgZoBUssd7a5ckJdX0A77B8QdIK35r8fGvrgrgdHtWDXEzQCqZ5RdV5wzAbI7G4WWAVPK299H2v/Xq1fADbub4A6S2/P+H949/dVQAp9l6NcPNAKlkoZ8nf/8/C14B2M85/gAp5V2/4YPHv/ACcI0uw8sAKS3//49e+sgFu6Cf38qe16m4GSCVrPIROvHhXypoBZD8jOMPkFKO+pc/evwLKwCX+lS8DJDS8v/f9NzHf7VwLUBTW6/2uBkglTzrg3S0hKq9YOX/Dzn+ACnlhH+5pONfOAE436/DywDpxO7Q6lJ+pyCf39DWqStuBkglL3h/HSqlci9I+f9djj9ASsn5jaUd/8IIwHD/Cl4GSGn5/3MtKuN3q/z59WyteuJmgFSyzfvoQBnVe5XL/3/l+AOkFb+5rONf9Qqgv61SHdwMkMry//e5L5bzf1Tp82vbKg3AzQCp5HXvrb3lVPBV+gH/xPEHSG35f0t5x79qFQCLvwHSW/6/t/i7ugSAxd8A6WWv9zq5+bd6WoBbOf4AqS3/b63I8a98BXC6rVMj3AyQSj6w+Ls6BIDF3wDp5W3vq20V7OQr9QNu4vgDpLb8/1ZFj3/lKgAWfwOkl48s/i54BWA/4/gDpJRDfmPFj39lBOAL+gxeBkhp+f8dvZjX5TzPz2fxN0B6KWHxd0ErABZ/A6SWEhd/F1IAWPwNkN7yv8TF34VrAVj8DZBeSln8XbAKgMXfAKml1MXfhRIAFn8DpJbSF38XpgVg8TdAeilj8XdBKgAWfwOkljIXfxdCAFj8DZDe8r/Mxd9VbwHq2VPqhZsBUkk5i7+rXAEk/5fjD5BWylv8XdUKgMXfAOkt//+Qu75Kf76c369tK3UObgZIJRVY/F21FuDbHH+A1Jb/X6va8S+vAmDxN0B6eajqz+aUJQCJLdJIvAyQSiq4+LvyLcCtHH+A1Jb/t1b9+JdVAbD4GyC9VHjxd+UEgMXfAOklj8XflWsBWPwNkN7y/1uFOf6lVQAs/gZIL3kt/q5EBcDib4DUkufi7/wFgMXfAOkt//Nc/J1vC8Dib4D0kvfi7zwrgOSnHH+AlFKJxd/5CcAlPg0vA6S0/P/3/Bd/59MCsPgbIL1UavF3HhVA8t8cf4CUUsnF3xUXgPP9erwMkE7sB5Vb/F3RFoDF3wDp5UU/u7KbfytUAST/yfEHSCk5v6E6jv/7AjDcv4qXAVJa/v+i8ou/K9ICsPgbIL1UafF3BSoAFn8DpJeqLf4uvwJg8TdAesv/Ki7+Lk8AWPwNkF6qvPi7vBaAxd8A6S3/v1adx18yjVa9VHugoeqW+Ot11VCS1ED1JdVJGkmy9/YYNFEtNzVTfTVQU9VTIzWiyanhzPIfBLT6aHVN/z84AwjSSn1IEBqrhVokLdTCW+jkP6xATfWl0KfpIdyAAFQfdf8mBe2Tdurk7dReHdQUx6SEd32U1uIGBOCT5RR1VDt11GlJe++g9uqqVjjlU2K7Dy7ELnxAAKpCU3VXN3VLunl39UYOPlGW+nk6hhsQgPTQSr3VI+ntPdVHbXFHtSfsD3K34QUEIJ00V28NTAb6QPUo973LUDncp2oGbkAA0k0jDdJwG6Zhao0zCsx+H6iXcQMCUDPopmHJCB/L0xYFZK0P1xHcgADUJFprTDLKR+ocfF6AtP1+7h/wAgJQE+mgiXaRxnPbUZXI+Xg9gRsQgJpKXZ2bXOQX60xcUUm2+9nahxsQgJpNL021KeqDIyqRug/krsILCEAW6KGpNkX9cER++BS+EEQAskPP5Dq/jpuJ8uBN7603cUNVqIULUsNun6cfanHSQGcQlwrRMGnjD+MGKoCscaq+ZF9RZxxRgTbgIs3CCwhAFmuzy+xrOh9HlMMr3kvv4gZagMxd2rRRd2lGUlt9VBt3lEqzxJw7AqgAMkxrfdW+oSY4ohSOej9twg1UAFnlHT2pX+uQna0GOKOkHLazdDduQACyzLt6Ur/QERtUyorU2HTTc9qAG2gBsk+r5H/5rSnf4/xpsMV78nwgFUCASsDn6e6kpfoh3R+iufZqBW6gAojCMPuZBuCGD7DXu/NwEBVAFF7Vr7TDzlV9XPEeDZJaPhc3UAFEol3yA+eJuJMc8TO0HTdQAcThoM/QUhvz3gvRolM7OcUfxQ1UANFoknzfb8INko75WdqCG6gAopW+j2qVnafGZHPS0B8hIagAItLa7tTl1ADek5XhVAAReUcPaKdNCB7RWkl95gBUAHEZbNOD7xE44qdrJ4lABRCTHfqjDVC3wB6onRz1+SQCFUDkMvjfPfJrM97yTjpAGlABRMV9nl6zi8K+nrS+9mg5aUAFEJtx9pCaBrX9Fe+mE6RAReAl1lllno/StqC2d9YkEgABiM5zPlLrgxa2txB+WgCQmtscDQpot3sPvUD4qQCis88n6qmIF7bkZoJPBQCS1Mxma2g4q9/wDjpG8KkA4C2fEPBrsda6mNAjACBJ+32ing5X3F5P4GkB4CSn2VJ1CWXxce+o1wk8FQBI0g6fpD2hLK4t1qUhAPA3NvokHQxV3k4j6LQA8EEusYcDPf/h3iXs3ZAVhIeBYvGCjtkFgS5vr/FYEAIAH2Rp0lO9wyhAU/2akNMCwAdpZMvVJ0wT0Jl3BZQFQ8B4HPRLtTvMBe4SAo4AwIfZ6tfJgygA9wMiAPAxHrOfBLH0fJ1CuBEA+Ai5f9CzIQxtoPOINgIAH+WwX6ujIVKc7UBlwNeAcXldx2xcADsb66cEuzT4GjB0/WdPaEzmrXQ/jYeCaAGghEGA36jDAS5yYwk1LQCUxF7Vscwfj2Qv7wukBYCSqW/rdEbGbdzkPQg0LQCUxGG/KfM3BZ2plgQaAYCSedLuy3ydO4gwIwBQCrnbMr8oZChRLhmGgCAdVD0bm+kS4F3dS5hLLo4ApMb2klpn2L43vA1BpgWA0jjgt2favtZCABAAKIM79VKm7etDiBEAKJ1j/h0EAAGAuDygdRlOdAQAAYAycf9uho3rTYBLgm8B4H1q2UZ1z6htu7wtAaYCgLI44f+dWdvaqBEBRgCgbH6rnZm17XTCiwBA2Rz27C4L7Up4P07tapSWa1UXB9c4jmf2WndljpuB3me/HpCqcwh4S5jF0wA1Dr+x+KVp1SUAnew5NcbNAKlkgV9QvAWimmYAdifHHyClvOs3nlwCUz0CcL0m4mWAlJb//6SX/3aprobPb2vr1QI3A6SSlT5SJ07+RzVUAPZTjj9ASjniX37/+FeHAEzVZLwMkNLy/1+1/kOX6wJ/fktbz+oFgJTyjA/WsQ/+QoErgOSHHH+AlHLcv/zh419oAZjkX8DLAOnEvqc1H/u1An5+E3tOHXEzQCrZ5P0//ibIAlYAyfc4/gApJec3lPQi2MIJwBi/CS8DpLT8/7GWlPjrBfr8U+yZzO6SAajpbPW+Jb/9qUAVQHI7xx8gpbjfXNrL3wpTAQyxZbxkDCCl5f+vczeW+nsF+Py6toat6wApZaf31r5Sa/cClP//m+MPkNr6/6ulH/9CVAB9rYjVXwApLf/vy32uzN+v4ufXsuUajJsBUske76U3yqzfq/gDbuP4A6S2/P962ce/qhXAmfa0GuBmgFTyV7+k3BahCh+f2AKdi5cBUsnb3luvlnuIq/ADvsLxB0ht+X9b+ce/KhUAi78B0svfFn9XUwXA4m+A1PKBxd/VIwAs/gZIb/n/gcXf1dECsPgbIL18aPF3NVQALP4GSC0fWfxdeAFg8TdAesv/jyz+LnQLwOJvgPTyscXfBa4AWPwNkFpKWPxdWAFg8TdAailp8XchWwAWfwOklxIXfxewAmDxN0BqKWXxd+EEgMXfAOkt/0tZ/F2oFoDF3wDppdTF3wWqAJJ/5fgDpJQyFn8XpgJg8TdAesv/3+RuqOSfrND/xeJvgPRS5uLvArQAyT9z/AFSW//fUtnjX7EKgMXfAOkt/+/PXV2FP13u/8Hib4D0Uu7i76q2ACz+Bkhv+f/1qhz/8isAFn8DpJcKLP6uigCw+BsgvVRo8XdVWgAWfwOkt/y/rarHv+wKgMXfAOmlgou/K10BsPgbILVUePF3ZQWAxd8A6S3/K7z4u3ItAIu/AdJLHou/K1UBsPgbILXktfi7MgLA4m+A9Jb/eS3+zr8FYPE3QHrJc/F33hUAi78BUkvei7/zFQAWfwOklvwXf+fXArD4GyC9VGLxd14VQPJdjj9ASqnU4u98BGCM34yXAVJa/v+kMou/K94CNLBndAZuBkglr3ifym3+rWAFkNzO8QdIKe43Ff74f7ACYPE3QHrL/0ov/q6YALD4GyC9VGHxd4VaABZ/A6S4/r+leo7/yQqAxd8A6S3/q7T4u3wBYPE3QHqp4uLv8lsAFn8DpLf8/3r1HX/JWPwNkGKqvPi7bGon3/adeBnKpEvFXyOfevbqrRr0tz3i/6N6f4CR3VBukuzJzn4ov1Z3E9EPzwAA4rABFyAAEBXXJpyAAEB+1MmMJa/qAOFEACA/6mXGko0EEwGA/LDsVADGBAABgDypm53vinIIAAIAYRsAWgAEAPKmWYZsoQJAACBPWmXGkre0i3AiAJAfLTNjyXMEEwGAsBWArSSYCACErQByqwkmAgD5pkh2XhWznGgiAJAvXTJixxvaRjARAMgTP53rPwIAVAA1XcgYASIAkDcNdWpGLGEEiABA3vTMiB05rSKYCADkS9+M2LFBbxNMBADyTZDe2bDDuP4jAJA/fnZGOoAniGWJwogLoMwEeV1tsqBj3l6sv6cCgDxpl4njL63j+CMAkD+jMlLHzCGUCADknx4jMjIBmEssEQDIv3UemQkzDmsJsUQAIF8aKBvfASzUIYKJAEC+DFPdTNQxNAAIAFQiOS7MiCGMABEAqMSVc0ImzNjJLkAEAPKnrfpnwQz7k5xgIgCQLxOycZ9objqhRAAg6gTgDS0mlggA5Es9vzgTDcBMnSCYCADk3wA0pQFAACBqYkzNhBm7tYhYIgCQfwNwaSYagBk6TjARAMiXiTQACADETYurMtIALCSWCADkS0u/nAYAAYCoXKP6mWgAfkMoyxVJXAAfS4qnM/EY8LqsLDSlAoBPkqHZ2ALgvySUCADknxI3ZMKMQ7qHWCIAkC+n+ucz0cZM11sEEwGAfLlFDbJgRu5XhLJCQokL4APUt62ZeBPAJu/JFgAqAMiX67PxIhD/JcefCgDyvhzY8zorA3Yc8Q7aTTipACA/Jmfi+Mvu4/hTAUD+1/+16peF+t/7aj3hpAKA/Lg6E8dfeozjTwUA+VLL1mejAfCxPANIBQD5cl02jr+KOP4IAORLPftONgzx7xNMBADy5X+qSybs2KKZBBMBgPxoa/+Ykev/f7ECBAGAfJPg+2qSCUP26g9EEwGA/BiWjef/JL9D7xDO/OBrwPCXAFuuIZmw5E3vpgMElAoA8uErGTn+8ts5/lQAkB+d7Dk1zoQlr/hZOkJAqQAgH/2/MyPHX/4vHH8qAMiP6+13GbFkk/fhC0AEAPKhra1Xi4xc/6doBgGlBYA8pN/uzMrxVxH3/yEAkB+36LKsmOL/mwVgtACQD31tZTa2/0qa4xMIKAIAFaehFalHRmw56v20iZDSAkDFg/6TzBx/2X9x/KkAIB+usbsyY8ur3oP7/6kAoOIMsF9kxxi/jeNPBQAVp42tVsfMWLPYxzD/pwKAilLHHszQ8T/uX+P4IwBQ8WD/VOdmqHj9sdYRU1oAqCh/bz/MkDU7vJf2E1QqAKgYn7E7smSO38LxRwCgooy1+1UrQ4XrH/QwQaUFgIrRzxaqWYbs2em9tY+wUgFARehmj2fq+Mu/yvFHAKBitLO5apupovX3lP+0AFAx2th89c6URTu8D9d/KgCoCG3tiYwdf/mNHP9CUhsXZJYOtkDdM1aw/s4fI7C0AFA+HW2BumXMphd9kN4mtLQAUB5dbGHmjv9hn8rxRwCgfPraYp2eNaP8G3qG0NICQHmMsxkZedvvBxN1em4aoUUAoDyus1+pTuasetkHcu8/LQCUx7fsdxk8/sf8Cxz/6oGvAbND3eTn/qUsGubf1ArCSwsAZdHepmt4Ji37k3+WzT8IAJTFKHtQ7TJp2QYfTvnPDADK4iabn9Hjv9cv4/gzA4DSqZ/8NJudv6RjPkUvEWIEAEqjl93rZ2fVOP+6FhBiWgAoGdNNtkqZPf72E91JkKs/iaBm0tp+rUszbN8iH6+jhBkBgJKYYL/L6NivmC0+RLsJMy0AfJzGyS9sdqaP/x6/iOP/ycAQsKZxsf3MO2Xawnf9M9pIoKkA4KO0Te6yR5Xt43/Mp2gpoaYCgA9jusb+21tk3Er3mzWLYCMA8GF62y81Ivtm+jf1O4JNCwAfpEXyn/ZUhONv39MdhPuTLiwhzdTVV+xfsvVen1JT8Z7cNTz1hwDA+7G50v5DXYJY+6hfoeMEnRkAFDPS7tDQMNY+5lM4/swAoJjh9ogtDnT8Z/tndYSw0wKANMK+rUtCWTzLJ+swgUcAYJR9K9jh5/gjACDJNN7+WeeGs/sRn8IzfwhAbOprmn1TfQJaPsuvoPdHACLTJbnFb4jxPf/HeNiv5OqPAATu+JO/8yuifhFrd+Vu0DGSAAGISBt93r6k3oHT7j9z/8RdfwhAPOpqQnKNX57B13dVHPdv6fukAgIQjd7JNf5FtQ7uheN+s35LMiAAkeihK+xq9cUResenaDZuQADCXPU11S7RQBwhSdrrl2oZbkAAsk+i4clknxzmWb6K8LJfwq4/BCDrnKpxyTi/SG1xxYdY4FO1BzcgAFmltoYll/g4DeAJyxLS7Fe5W/jWHwHIIrXUTxfYeI1WA5xRIsf9G/oJbkAAskUTDdEoG6iRao4zymCfT9M83IAAZOV630MDk5E+Sj3xXQV4yS/TBtyAANRsWqif+iZ9vZ96qxHuqDCP+1V6CzcgADWReuqpPklf76e+ao878ibnt+t2ncARCEBNobm6qqu6Jl29q7qqs2rhkkqz26/hjj8EIL0kaq02Ok2t1S5p653VVV0p7gvGEr9Kr+EGBODTLuIbq4maqbGaqLEaq1nSTO28tU5TG7Xm2/pqwu37uX9mxXdmBSD5vpqk5m9fp/iq7Q1VV5LUTPberzZRY9UjvJ84e/16PYIbMiwAtpObXKEUVvmV2oobalYvDFAIjtt3fTTHv6bBq8GgEGzx63wxbqACgHi4/dL7ieNPBQAB2eU3OmM/KgAIyUPem6k/AgAR2eOfZ8kHLQCExKbnvqY38AMCAPHY4l/xx3EDLQDE47j9yPuJ408FAAF52m/y1biBCgDi8a7/ow8Sx58KAMLhdn/uW9qOIxAAiMdTfis3+tICQER2+60+hBt9qQAgHsfs57nv6G0cgQBAPOb53zkrvWkBICCr/AIfz0Z/BADiscGn+TA9gSNoASAa2/zf9Bu2+SMAEI83/Q79UEdwBAIA0djnP9IdOoAjEACIxhv+//RT7ccRCABE43X/oX6sd3EEAgDR2Ow/0p06jCMQAIjGs/5fupcXeAECEI8Ffocek+MIQABiccQezN2hZ3AEIADReN3v1E98N44ABCAaa/xHuk/HcAQgALE4ZNNzP1YRjgAEIBrP+136tfPiDkAAgrHfHsj9UmtwBCAA8fr9X+oefwdHAAIQiy12b+73eglHAAIQiz02I3e3ljo39wACEKzb/0tuumY7X/EBAhCKw5rn0/WQ8yQfIACh2Gvzc4/qYdZ1AwIQi602J/coBT8gANF43qfrET3FmA8QgEi8YfNyczVHO3AFIABxOK5n/FE9orWewxmAAMThOZubm6NF7OkDBCDSFf8FW5Kbpyf1Jm0+IABReEdP25LcUi3Sfg4+IAAxOKGNtiZXpKV6Ric4+IAAxGCn1vgardES7ePYAwIQgYPaaOtzz2iN1vLqLUAAInBUL9n63PNar+e1QTmu9oAAZJtD2qzNtjm3WS9qg14Rt+wBApDpA79TO2xzbrOK/9kpiXdtAAKQQfZqj3bZDu3M7dBO7dBO7dQ+DjwgANljqz2U26t92qf3/y0OOyAAMeiYm6/ZuAGikOCCD1HL7lE33AAIQFRa2Ew1xA2AAESln90lww2AAERlsr6JEwABCIv9hybhBUAAwvrF7lF33AAIQFSa21/UBDcAAhCVnvYHhoGAAMTlcn0bJwACEBa7XZfgBUAA3udgLP/Y3TqDNAEE4D38eh0N5aFm9oiakiiQTWrl/Se266BNDOWjVtZTD/I4ICAAxaxIOmtAKC/1UE4LSRbIHpX7mqu+LdagUH5yn6oZpAsgAMV0siKdGspTB3y41pMwkC0q+zXgNr9ax0N5qrHNVDMSBpgBFLNFh218KF+1tAG6j2EgIADFLEt6qE8ob3VPzBeQNMAMoJgGtkTnhPKX+5WaTtoAAlBMF1utVqE8dtCH6zkSB7JBVZ8F2OpX60QojzWyv6gliQPMAIrZrGN2QSifNbcBupdhICAAxSxNeqp3KK91S+r4fJIHmAGcLIuXB/s+wP1qPUD6AAJQzBm2KthtMod8lJ4igaBmU6iFIC/6lcGGgQ1sRrDvP4AZQBm8LNl5oXzXzAbqXuVIIkAAJGmR9VavUN7rmjTwuSQRMAMoprGtCCYB8i/q96QRIADFnGmrgi3QOuyjtIZEgppJobcCv+DXBuuK69uMYJsRgBlAGWxKamtMKB82s+H6I8NAQACKu+KFNlBnhvJip6SxP04yATOAYhrbSvWM5Uj/sn5LOgECUEwPWxns1ZqH/VytJqGgZlFdrwbb6NcFe16uvs1QaxIKws8ATkpAUk+jQ/myqY3QH4PdEA0IQKld8QIbHOy9ep2S5j6LpAIEQJJcs+yzahHKn0P0Gs8IQs3Bqvnz+9pyNQzl0SM+RitJLKgZJNX8+c/6tcGGgfXsT2pPYgEtQDEbkkYaEcqnjW04w0BAAE6OAp6wIeoeyqsdk1b+V5ILEACpeBg4Vc1D+XWQdvKMIKQf+4R+ztm2TKeE8uwxv0CLSTBIN8kn9HOe8RuDebaOPagOJBjQAhTzbNJMw0L5thF3BgIC8P4oYL6dqy6hvNsh6eQPk2SAAEhSTo+GGwaerTd5RhDSi33CP2+ALVWDUB4+5uO1kESDdJJ8wj9vrd8czMN17AF1JNGAFqCYdcmpGhLKx41srO7WMZINEABJPjfcMLBd0tn/RLIBAiBJOc2yq4ItDOunfTwjCOnDPqWfO9QWql4oTx/3C7WAhIN0kXxKP3el3xTM07VturqScEALUMwzyWkaGMrXp9hY3cUwEBAASZI/bmPVOZS32yan+0ySDhAAqXgYeHWwYWBfHdRy0g7Sgn3KP3+4Pam6oTx+wi/RbBIPqAAk6VXttYtDeTyxizRD+0g9QAAkaXXSQeeE8nkD485AoAX4G/VsUbCbg6WZPiXYtmSgAiitK9Zf7XNqHMrvPXVIS0k/oAIoZqQ9EWwYmPNL9RgJCFQAkrRdB2xiLOm1izRDe0lBoAKQJCW/9S8G8/5GH6q3SUJAACSpvi3WoGD+f9gnMwwEWgBJOq7H7QvBXiXaQ8d4ewBQAZzkfHtctUNFIOef0aMkIlABSNIWvWsXxpJgu1R/1pukIlABSJKS3/t1waKwyYdqP8kICIAkNbAlwW4Olv7iVyhHOkL0FkA6OQyM9SrRs+S8PQAQgGL2a619/lNbV/bplGJjtF7Pk5CAAEjSZh21cbGaMZukvzAMBGYA7/3Nkvt9WrBovOBD9RZJCQiAJDWy5eoTLB6P+8W8UBxoASTpqGbZNcGGgd2TxHl7ACAAkqS3tNY+F2sYqNHaoPUkJiAAkrRZOTs/VlNmk/SI3iA1IfoM4OSBeFBTgkVlqw/WbpITEABJamQr1DtYXOb6JIaBQAsgSUc1z65V/VBx6ZbU9fmkJyAAkrRH6+3KGlGtFI6R2qTnSFBAACTpBSU2NlZzZhdrlnaSohB9BnDyQDykycGi84oPYhgICEAxjW2FegWLz3yfqOOkKURvASTpqObbtaoXKj5dk4Y+hzQFBECS9mhDuGHgCL2ip0lUQAAkaVNSV6ODdWkT9bh2kKoQfQZQTGKP6KJgUdrmg9gUAAhAMc1tlboHi9MSv0BHSVco+PW0Bv6d9/ll4V6oNSr5HskKzACK2a1NNi3YMHCYtmstCQsIgCRtTE7RyGDd2gTN1WukLESfAbzXvNhfNTFYtHb6IL4PAASgmBa2Wl2DxWuZn8cwEAp4Ha3Bf/e9PlnvBovXiOQHJC0wAyhml7baZ4NFbIh26CkSFxAASXo2aarhwbq2iVqgbaQuRJ8BvCdh9pguDBa1130Q3wcAAlBMS1ut04PFbbmfpyOkL1SVLOzc3xNwGDg8uZPkBWYA75XE2mbRtgX11+taQwIDAiBJ65JWGhKse5ughXqFFIboM4Bi6thcjQkWvV0+SK+SxIAASFIbK1KHYPF7ykfpEGkMlSVLL97c5Z8JdxjOYRgIzABOslPb7YpgETxbu7WaRAYEQJKeSdpqULAubrwWayupDNFnAMXUsfnR1oZqjw/WFpIZEABJamtFah8sjk/7yHA3Q0EBSDJo0+s+Jdxtsv0ZBgIzgJO8qj12cbBI9tN+rSChAQGQpKKkg84J1s2N10q9TEpD9BlAMXVsQbS1odrrg7WZpAYEQJLaWZFOCxbPZ3yk3iGtoaIkGbZtp08Nt0Dz7ORXJDUwAyhmu/bbpGAR7at3tIzEBgRAklYlnTQgWFc3Tqv1EqkN0WcAxdS3RRocLKp7fQjfBwACUEwnK9KpweK6zkcwDITySQLYuM2v1PFgce1ndwd7eSowAyiVrXrHJgSLbE8d1hISHBAASVqedFH/YN3d+VqjF0lxiD4DKKaBLdbAYNHd50P4PgAQgGI6W5FaBYvvRh+qt0lzKI0kkK2v+FXhhoE97C6GgcAMoJgtOmLjo0mAjmsRiQ4IgCQtS3qoT7Aub6ye0gukOkSfARTT0JarbzCbD/gwPU+yAwIgSV2sSC2D2bzJh2o/6Q4fJQlo81a/WieC2XyW3RUy1sAMoAQ264SdH00CJD1JwgMCIElLkl7qHazbG6P1TAKAGUAxjWxFNAnQQR+m9SQ9IACSdIatUrNgNr/oQ/QWaQ8niTwYetGvVS6c6D0Qtu0DZgAf4QUlNjaYzd2SWv4EiQ8IgCQttD7qFczm0drAJACYARTT2FaEk4CDPkLPkvyAAEjSWbZSTYPZvNUHazehB+4Okzb5dfJgNnex+xgGAjOA9yQgqa1zg9ncNanv8wg9AgCSfKEN0pnBjB6hTXqO2DMDAElqbqvUPZjNh3y01hB6BAAkqYetVJNgNr/ig/UmoY8LQ8D32ejXhxsGdrb7VJvQMwMASdqYNNCoYDZ3TRr5HEKPAIAkf8KG6IxgRg/XNj1N7JkBgCQ1t9XqFszmw36uVhN6BAAkqZ8tU8NgNm/zwXqD0MeDIeDHWec3hrO5k81UXULPDAAk6bmkiYZHk4Ckqc8m9AgASPL5NjTcbUFD9arWEntmACBJLaxIpwez+bCP0SpCjwCAJPW3pTolmM07fZB2EPo4MAQsnaf9pnA2t7PpDAOZAUAxzyYtNDSYzR2TVv5XQo8AgCSfZ+eqSzCjB2uHniL2zABAklpbkToGs/mYX6DFhB4BAEkaYEvVIJjNr/sgvUbosw9DwPJZ6zeHs7mtPaR6hJ4ZAEjSuqSNBgezuUPS0R8m9AgASPI5NkadgxndX7tUROyZAYAktbE1ah/M5mM+XgsJPQIAkjTMngzXF+/yQXqV0GcXhoAVZ4X/fcC65y/hvgFhBgClsCZpr4HBbG6XdPI/EXoEACT5bDtPnYIZfbb28IwgMwB474poRTotmM3HfbyeJPQIAEjSCFsQ7om5PT5YWwh99mAImD/L/LZwNre0meF2IzADgFJYlXTUOcFsbpt08ZmEHgEAST7HJoS7Laif3tYKYs8MACSpoxWpdTCbT/jFepzQIwAgSSPtiXDDwL0+WJsJPS0ASNt10CYGs7mBjdXdOkbwEQCQViRd1D+YzW2th6YTegQAJPnjNincbUE99Y6WEXtmACBJnW21Tg1mc84v0SxCjwCAJF1gs1U7mM37fIheIvS0ACBt0WEbH8zmBjZed+sIwUcAQFqW9FCfYDafaj30IKFHAECSP2aT1C6Y0T11REuIPTMAkKQutlqtgtmc88vEa8QQAJAkjbdZ4Sqqt32YNhB6WgCQNuu4XRDM5no2jmEgAgDFLEl6qncwm1tZTz0oJ/gIAMhn22XhnhHsoRxvD2AGAMWcYavULJru+VTNIPQIAEjShfZYuMrqgA/XekJPCwDSy5KdF8zmejZOf9Rhgo8AgLTIeqtXMJtb2gDdxzAQAQBJmm2fCfeMYPdE/iShZwYAknSWrVTTYDa7X8myEAQAirnM/hTuvQsHfbieI/S0ACBtSmprTDCb69ok/VGHCD4VAEiJ/VmXhLN6rk/SCYJPBQCuR+3ycMPAbkkdn0/wqQBAknrYSjWJJnx+tR4g9AgASNLlNjOcn9/x4XqW0NMCgLQxqa9RwWyua5N0j94l+FQAICX2qCaFs3qeT9Jxgk8FAK7HbIpaBLO6a9LA5xJ8KgCQpH62TA3DKd/ndB+hRwBAkibbQ+H8fchHaw2hpwUAaUPSSCOC2VzHJjAMpAKA9+TWHtXEcFY/4RMYBlIBgOSaZVPVPJjVpyeN/XGCjwCAdEgL7VrVCWb1cG3XWoKPAIC0S6/Y5HCd5gTN0Q6CjwCA9GzSXMOC2VzbJuoevUPwUyfNuOBTOQ5zNTac1Uv9fB0l+OkiwQWfAsd9iraEs3pkcgehpwUASTqkRQGHgUP0mp4i+AgASK9rm10RruOcoDl6jeAjACCtS07VkGA217ZLdJ8OEPzUSDIu+BSpY/N0bjirl/t5vFA8LTAE/DQ55tP0ajirhyc/JPS0ACBJ72i5XaPawawepJ08I4gAgCS9qu12ebjOc6Ke1DaCjwCA9ExymgZGyzubpPsZBqZAinFBCqhj8zU6nNUrfCzDwE8bhoBp4JhPC/jt+LDkl4SeFgAk6aCW2zXhonG23lARwUcAQHpVe+3icB3ohVqkVwg+MwCQlPzavxzO6F0+WNuJPQIAUn1bGO7mYGmtj+SF4p/aRQcXpIjDfrl2hrN6QHInoWcGAJJ0UCvsCwGHgfu0kuAjACBt1wELtzrcxmuJthJ8ZgAgKfmtfzGc0Xt8cMAtSQgAlEB9W6xB4ax+2kfyDqFP/GKDC1LIYf+s3gxndf/kV4SeGQBI0n6tsc+Hk+e+OqDlBB8BAGmLDtmF4TrScVqllwg+MwCQlPzerwtn9F4fopeJPQIAUgNbonPCWb3OR/AOoU/sIoMLUswhn6zd4azuZ3dxYWIGAJK0X2sDDgN76l0tJfgIAEibddTGhetML1CRXiT4zABAsuR+nxbO6n0+hO8DEACQpEa2XH3CWb3Rh+ptgl+9MASsCRz0y7QnnNU97A9coJgBgCS9paftc+HkuoeOaTHBRwBAellu54XrUMfqKb1A8JkBgGT2oKaEs/qAD9PzBB8BAKmRrVDvcFZv8qHaT/CrB4aANYmDPjngUTjL7iJPmQGAJO3RersyXN12llwLCT4CANILSS2NCdepjtF6JgHMAECSzB7S5HBWH/DhWk/wEQCQGttK9YxX+/hQvUXwCwvDlZp5Nbwi4E2yZ9r9tKzMAECS9mhDwGFg9yTxBQQfAQBpU1JXo8NZPVobmAQwAwBJSuwRXRTO6oM+XM8RfAQApOa2St3DWb3VBwV8NrK6riK4oAazzy/TgXBWd7H7aF2ZAYAk7dYmmxaujuuW1PX5BB8BAGlD0lAjw1k9UhsZBjIDAElK7K8K90JxHfJReorgIwAgtbDV6hrO6ld8UMC3JhT66oELMsBenxzwxdqd7X7VJvjMAEDapa322XBWd01O8bkEHwEA6dmkqYaHs3qEXtHTBJ8ZAEi1bY7CrQ3VYR+tIoKPAIDU0lbr9HBWb/NBepPgVw6GgFliT8hhYCebqToEnxkASK9rm8XbFtQpaeyPE3wEAKR1SSsNCWf1MG3XWoLPDACkOjY33tpQHfZztZrgIwAgtbEidQhn9Q4frB0EPz8YAmaRXT5FR8JZfZpNV12CzwwApNe0za4IZ3XHpIU/RvARAJCeSdppUDirh+g1nhFkBgCSVMfmB1wbeszP1xKCjwCA1NaK1D6c1a/7IL1G8CsGQ8BsH4WpAYeBbW266hF8ZgAgvao9dnE4qzsmHfzPBB8BAKko6aBzwlndXzu1huAzAwCpni0KeHPwMR+nRQQfAQCpnRXptHBW7/JBepXglw1DwAjs9Kk6Gs7qNvZnNSD4zABA2q63bVK8yifp6A8TfAQApJVJJw0IZ/XZ2s0zgswAQJLq2yINDmf1MR+vhQQfAQCpkxXp1HBW7/LB2k7wS4YhYCS2+ZU6Hs7qNvZnnULwmQGAtFXv2IRwVrdLOvufCD4CANLypIv6h7O6n97SSoLPDACkBrZYA8NZfdwv1AKCjwCA1NmK1Cqc1Xt9sDYT/A/DEDAir/hVOhHO6hY2k2EgMwCQpC06YuPCWd02Od1nEnwEAKRlSQ/1CWd1Xx3UcoLPDACkhrZcfcNZfcIv1SyCjwCA1MWK1DKc1Xt9iF4m+MUwBIzMVr866DCwIcFnBgDSZp2w88NZ3cZ6aDrBRwBAWpL0Uu9wVvfUYd4ewAwAJKmRrQgoATm/VLxGDAEASWfaSjULZ/U+H6KXooeeISBIL/i1yoWzurk9oibMAACkF5TY2HBWt7JeegABAJAWWh/1Cmd1Dx2P/fYAZgBwksa2IqAE5PwzehQBAJDOspVqGs7qAz5Mz0cNOUNAeJ9Nfp08YOUzM6DsMQOAkiQgqaNzw1ndynrpwYDShwDAR/EnbZDOjNf8SHqSGQCA1NxWqXs85fNpeggBAJB62MqAt8gc9GFaH81ohoDwcTb69QE74kY2M94N0cwAoEQJSBpoVDirW9o5ui+W9CEAUHJL/IQN0RnhzO6W1PInmAEASM1ttbrFUz6/Sg8iAABSP1sWcHnWQR+hZ6MYyxAQSmed3xjQ6kb2lzjvTWIGAGXxXNJEw8NZ3cwG6N4Yw0AEAMpuiefb0IC3BXVL6vk8ZgAAUgsr0unxlM8/p/sRAACpvy0N+FrNQz5aa7JuJENAKJ+n/aaAVjewGTqVGQCA9GzSUkPDWd3MztG92V6XigBAxVriuTZGXcKZ3TVp6HOYAQBIbaxIHQJK35f0OwQAQBpgS9UgnNWHfbSKsmocQ0CoOGv95oBW17cZas0MAEBal7TR4HBWN7XhuiebL1JHACC/jniOjVHncGZ3Spr6bGYAAFIbW6P2AaXvBv0GAQCQhtmTqhfO6sM+RquyZhRDQMifFX5rQKvr28M6jRkAgFSUtNfAcFY3tuH6Y7aGgQgAVK4jnm3nqVM4szsmLf0xBAAgp9l2tRqHs3uwduip7JjDEBAqzwhboLrhrD7mF2hxVoxhCAiVZ5nfFtDqOvZgdr4GpQWAqrAq6ahzwlndyEZkZRiIAECV8Dk2IeBtQR2Sjv4wAgBwXLPt8wHfHtBfu7LwjCBDQKg6o+wJ1Qln9TEfp0VUAADbdNAmhLO6ll2k+/U2AgCwIumi/uGsbmRjdbeO12QT/j+ep9hjiDMkPAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMi0wMi0xN1QxMTowNzozMCswMDowMADtvtwAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjItMDItMTdUMTE6MDc6MzArMDA6MDBxsAZgAAAAAElFTkSuQmCC
" style="width:8px;"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>
                                    <strong>Activation Package</strong>
                                    <br><div style="padding-left:5px">T-Shirt &nbsp; Size: {{ $order['size'] }}</div>
                                </td>
                                <td style="text-align:right;">{{ $order['price'] }}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td colspan="1">Thank you for giving us the opportunity to provide you the services</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="2" style="text-align:right;">
                                    <strong>Subtotal</strong>
                                </td>
                                <td style="text-align:right;">{{ $invoice['subtotal'] }}</td>
                            </tr>
                            <tr>
                                <td colspan="2" style="text-align:right;">GST ({{ $invoice['gst_rate'] }}%)</td>
                                <td style="text-align:right;">{{ $invoice['gst_amount'] }}</td>
                            </tr>
                            <tr>
                                <td colspan="2" style="text-align:right;">
                                    <strong>Total</strong>
                                </td>
                                <td style="text-align:right;">
                                    <strong>{{ $order['price'] }}</strong>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 50px;">
                        <tr>
                            <td style="border:none; padding:0px;">"This is computer generated invoice and do not require
                                any stamp or signature"</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
</body>

</html>