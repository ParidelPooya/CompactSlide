function DrawToolbar(canvas) {


    $(canvas.param.menu).append(
                        "<img class='MenuItem' id='" + canvas.id + "New' data-vectorid=\'" + canvas.id + "\' title='New' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACH0lEQVRIiWP8//8/Ay0BE01Np4kF//79o5UFXz5/qa6oCPT337dnL1yQES0O/v379+PHD0YGRmJM/M/wn4WFhY2NjYGB4ePHj8X5hUIiQrKyskcPH1mxZjVEDQuanrLikpMnTrBzcBBjwa9fvzw9PStrqj9+/FiYl3/82LHm1tYN69f7Bwbg9IGbk3NjS7OqqipxPmDg4uL6/ft3bla2jIyMppZmbVVNRVVlZk42kiJU4OnqdvPmzf9Eg/fv3oUFh1RVVN69ezc4IHDOrNloCrBEMloywAPevHmTlpyiqqaWlJKcn5vr7eOdnJqCpob8VPT69ev0lFQNLa2EpMT83Nzg4JDE5GRMZWRa8Orlq/TkFF1dndi42Pyc3LCwsISkRKwqybHg5YsXacnJ+oaGUTHR+Tm5kVGRcQkJuBSjJ1OC4PWr1+mpacampqFhoXm5ebFxcdExMXjUk+yDKZMnq6qqBoUE5+fmxccnQEz/+PHj2jVrsJabpFnw5MnjHdu3//79q6SwMCU1JTI6CiL+5vXrqZMnY7WAtCBavXL1p0+fuLi5+yZM1NTShIszMjKysrJi1UKaBc4uzt4+3mrq6sRrIc0CPX19ktQzDMkKZ9SCQW/B////OTk5STWFk5MTV/sKPR/8Z2BoaWwSFRUlyYJ37979+/ePkRFLUwG9Tj5x/MTFC+cZGUkLuv///+nq6VlZWxO2gOpg+KWioWcBALetE/h0iqNiAAAAAElFTkSuQmCC' />" +
                        "<img class='MenuItem' id='" + canvas.id + "Load' data-vectorid=\'" + canvas.id + "\' title='Load' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADNElEQVRIid1WXUhTYRj+tjOm4xROmu4imdAMbVPIC+dPYReFOtP9mOk0u1DTjBLHyh/qSvFSxEAM68JUWKOrKS5DU5sKFXahMHEH9SpFNjfdgu14tp1zujgw3I7L45gX9V69P+d9n/P+fd/HIkkSnCexzzX6fwHACZPXVlfHR8cQBCEIHAAWwyg+n6++ob62ro5uYh1v8r7d3lhfL5PllisVHE449l+IJEmhUJiUnEw3hURBECQxMbHr1cvmR022vT0Ighj9vt/X0NiYmZV1ojUEgMViWyyW+bm5zq5OgiBZzCpEkuQlgSCSNQyAhR1hw0NvUBSlZEYIAKCo925Z2YuOjlMAAn6/RCIZGR9zOBxnWsAf374b9PrTAQAAJEnCMAzDMPPoAIDdXzuRhiI2e4DjeKSMY7doERoWGwCJVNreeUIDAL0HzAnDsEAgwOPx2Gy2IEkgSDp5Us8MsG+3z87MrFvWt7a2EvgJGRnX8gsK8gvyI31/thJ9np5+WPvAbDaL08Ta5zqVWo16vb093bo2rcvlAgAQBBHuQx4j88LXSpWajEALc3O3btz8Mjsbpj88OGhrbW1qaPB4PHQvpgBOp1NeVPTJZApqlpeWbTYbxWMYVlNV9W74Ld2RaYkmjRMpl1PkpaWU+NFgqK2uftrS4nA4AABcLler000YjW63K8oeLC0uFsvlFG/Q60dH3otEIr/Pr33W6nQ6AQDXs7M5HM4mshklgMvlEgqFFB8XH9//ekAkEml1OoVKeYSiVBIcCPJ4PGGOTMcUhmFqTgAA6ooKAACGYRAEVWk0lBLHcZwg4uLjoswgR5azMD8fomKF3IaIFcEw7IpYHCWAuuLe2traz5WVoKa9s0MilQbFocHBwsLCZPqteXyklsyLmsr7kfbgg15ffPuO1WoN0wcCgf6+PrVCeXh4SPcK6UF6RrrH6+nt7ilXKY+f7yRBZGZlaWpqfrvdT5ofl8hLZLLctKtpbrd73WIxTZlQ1Ns/MMDn8+mph9QRBJ8tVitBEMET2OfzTZqmeDweAMC6sTFhNG5vbe/u7F64CItSU/Py8soVCm5ceHtPBog5/ftPx3MH+APOYxoJHuDENwAAAABJRU5ErkJggg==' />" +
                        "<img class='MenuItem' id='" + canvas.id + "Save' data-vectorid=\'" + canvas.id + "\' title='Save' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADG0lEQVRIiWP8//8/Ay0BE01NHxYWsKDxL164sHjhops3b/7795eBgZFIU379+pWYlBgVE4MpxYgcya9fvUpOTDQzM/f192NhQbcbD/j//7+4uLiomBimFIopN2/eFBQUrKiuSktJffn8OTMzM1HO//0rKTlZR1cXqyyKBYyMTFeuXNm3d295Rfm/f/8ZiQuh////C4uI4JJFs4Dx54+fM6dN//79O4RPlA0MDN+/f/P28SkpKyNgwZ/fv7W0tOYvXvTmzRuSMuDJ4ydWLFtG2AIGBob///9zc3Nzc3MTbzoDA8PTx09wJQrq5IO/f//i8jH1MhqOCKOOBVra2qXlWCKAATMOiAc/f/788+cPJycnExOTiKiIiCj2lEqyBb9+/ty8adOJEycePXz45fNXaRlpZRVl/4AADU1NKljw4P6DspJiTk4ubx/vhMREfn7+O7fvnDp1MisjMyIyIi0jA4ue/0jg4P4DIQGB/3GA9+/fB/r59/X0/PnzB03qxo0b7s4uy5ctw9RFQiTPnDZdSkqqsLgYUka9ef3m5IkTECl1dfWW9rY5s2Y/efwETRexFrx69erQoUNZOTlwkWtXr3Z3dsG5Jqam+vr669etJdOCe3fvsrOzq2uow0UYGRkZUDOXo5PT6VOnybTg54+fzExMkMB5+uTJqhUr/v79y87OfvPGjfXr1kHUCAgIfP36FU0jsamIm5v7z9+/v379YmNj4+Dk3LRh45cvX96+fVuUXxAbHwdR8/LlSwEBATJ9oKqu+ufPnwvnzzMwMAgLC0+YMpmVjfXRo0fxiQkRUVEQNTu3b7e1s0PXSXwynT1zVmRY2M+fPyHcly9fHjl8BC67betWTze3t2/foulCseDwwUMRIaG4LPj+/XtqUlJ+bu77d+/QpPbs3m1vbbN/715MXTgq/QB/5PL9/79/kDr9w4cPTfUNN2/esLKyNjQ2EhQSun716smTJx/ef1BQXOTh6YkZtigWMMCbLTdu/Pv3D14Co7VKjh87fvzYsRs3rn/88FFFRUVbR9vVzQ1rkwKLBVQHQ7/pSHMLADYGIC2k6NuPAAAAAElFTkSuQmCC' />" +
                        "&nbsp;" +
                        "<img class='MenuItem' style='' id='" + canvas.id + "Undo' data-vectorid=\'" + canvas.id + "\' title='Undo' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACb0lEQVRIie2VP0jjYBjGv9wVW0gTzGRLhi6ihSxWRYe6lFLsEChIwMVCWyiCm0tpTSn+QwyOLi0IFQeXTlm6tBCKg0ss2kqHZAlKBUE0ZimpJLmhh+Q8G4sod0Of7Xu/h/x4n/dNAhmGAb5TP7716UPAEGDW/f19JBKp1+vfAri6ukokEpeXl91u9+sBLMuur68nk8mFhYXPvJVGf728vBweHi4uLnIcZxjG2tpao9Gw8L8rWz/ww8PD/v4+DMPHx8culwsAAMNwrVaTJEnXdV3XIQhCUdTn82EYZtEA9G7X19fXqVRqamoql8s5HI5XpKqqAABVVdvtdqvV4nn+8fGRJEmKohAEGTQilmUDgUCxWOwddV23yPDi4iIWi5Ek2S+9twBBEAiCKBQKg6es6/rR0RFJkoIg/H37c3Nz09wQhmE2m43jOKfTOT4+br0gv1OGoOnpaU3TTk9P5+fnnU7nxzO4vb3d2Nhwu907Ozt2u71XVBSl2WyKotibhN1un5yc9Hq9r0Pe3t4eGRlJp9MfAwAANzc3NE0jCHJwcADDMABgdXVVlmWCIHpHRVEkSXp+fp6YmKAoam5ujud5mqZLpRKKolZDNiuTyYRCoXq9bhjG0tLS+fn5G8Pd3V0+nw+Hw1tbW51OZ3l5uVKpWM3gjYLBIARBDMOMjY01m82ZmRmPx2M2IAgyOzsbCASq1Wq5XMZxXJZlv9//avj4U7GyspLNZk9OTp6enkZHR9/14DjOMAwMw6Ioapr2x92AuyjL8u7ubqvVsvCoqhqNRuPxuLk4KGBAnZ2d7e3tmSt9t+ir9N/80YaAIeAfAn4Bddm+RmhEf3oAAAAASUVORK5CYII=' />" +
                        "<img class='MenuItem' style='' id='" + canvas.id + "Redo' data-vectorid=\'" + canvas.id + "\' title='Redo' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACUElEQVRIie2VvctxYRzHr/vkbRAn2URKFi+bUYpS96DIchZKogwWg6IYCOn4A1BKmc+iFGUwGJTyOnFMKC+TInmL6xmUwrm59eTpGXynU9fv9/1c1+97uq4vCCF4p5C3un8AHwClms2m0Wicz+fvAuz3+3a7bbfbO53OWwAQQrVa7XQ6PR5PPp9/Wk97FcBms1EUNZlMKIrG4/HxeOxyuWi0H32+Hl8Vi8Wi1Wotl0sIIYIgCIIMh8PRaITjOABgNpslk8n1eu3z+fh8/muA1WpFEEShUODxeCqVSiaTCQQCJpMJAGAymRe77XYbDofb7TaO4wqFgsIIUqnb7RoMBpvN1mg0DocDZQ2E8HQ6nT+y2axWq83n8/c1FACSJA0GQyaTufT/Rul0Wi6XkyT5BDCbzRwORy6X+701hLBYLGIYlkqljsfjzdJt+tlsVigUWq3WS8i9Xq/f7+92u/P0pVKpUqnkcDjngt1uFwwGp9NpIpEQCoX3EVwBlstlpVKJRqMAgHq9ThAESZJcLlcsFp8d5/N5sVhEUTSdTgMA1uu11+tdrVbRaJTS/TbkcrmMYdhmswmFQt/f36lUajKZ3By5VquZzWYIYbPZ1Ov1fr//8fSuTtBqtSQSicfjYTAYmUxGIBDcb+hwONDp9FKphOO43W63WCzUG6cc0fF4HAwGIpEoEomwWCzKBhRFF4tFLpcLBAI6ne6x+y2AJEkWixWLxRgMxo8NNJpGo3G73Vwu96k7ANcZxGKxarX60g/6VE/uor/X//eifQAfwL8H/AFVsWctWkEq4gAAAABJRU5ErkJggg==' />" +
                        "&nbsp;" +
                        "<img class='MenuItem' id='" + canvas.id + "Selector' data-vectorid=\'" + canvas.id + "\' title='Selector' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACcklEQVRIie2WMWjqUBSGre+hg4PQrXQq2EWwg3ayYId0CFpFgkVcHOogTrpLxQ6ik5uDiqRdlEQcXaRdRGhBEdShaAYV1KStOKklxfS8IfAoalJefH08Sv8p/Pfe83HOueeSLQCQfabknxr9G/AfA+7u7ur1+mKx2Bzwc61LEESn09nd3bVarQaDYWdnRy6XmOt6AIIgMpksEAiUSqVoNErT9OHhocPh2N/f/2MCrNNkMsEwrNlsAsDT0xNJkj6fz2QynZ+fkyT5+Pi49tRabQlNcigUUiqVwWDwtzMajW5vb29ubmia1ul0KIoajUaVSiUlAwBot9tms3k6nS75b29vFEXF43EMw1AUvby8nM1mIhkIAliWdTgchUJBaMN0Oo1GowiCUBQlAhC8GwqF4vj4uFqtCm1IJBLj8ZggCI1GI6VEANBoNCwWy2QyWfIXi0Umk7Farb1eT+Q4LzEAAJydna1WiaIorVZbLpc/jP4xIJvNejye987LywsA5HI5u93e7/c3BbRaLZvNVqvVAIBl2XQ67ff7R6MRAKTTaa/XyzCMeIQf4XBYpENqtfrh4WE+nxsMhlgsxjCMXq9PpVIHBwcIgnAcl0wmtVrt9va2lCbzKhaLTqczkUg4nc7hcAgAOI5jGMZ/X11dnZ6edjodiSUCgNfX15OTE5fL9X7o8vk8iqLtdhsACIKwWCzdblciAAAqlQpN00vm9fU1hmH8lOE4brPZBoPB6tn1r+mSjo6OVk23261SqSKRyMXFBcdxe3t7SqVSSg9ExHEcSZIoikYiEf76rmojAK/7+/vn52ehVcHn+m/pq/5VfAP+JeAXfMV0aaF4qGcAAAAASUVORK5CYII=' />" +
                        "<img class='MenuItem' id='" + canvas.id + "ZoomOut' data-vectorid=\'" + canvas.id + "\' title='Zoom Out' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADDklEQVRYhe2XP0jrUBTGv9SniDgbqHXQ4lCyOChJlSqC2rEIKijVUXR0Li6ujpWCcycXwUWCk1RF7VR0EHQQxaJWtIoVm9rke8t7F0L/vFh9unggS+653/klud85RCJJfGO4vrP4DwAA/HKS9Pr6ir29PRweHuLq6gok4Xa7oaoq+vr60NzcXDsBq4RlWYzH4+zq6iKAspfP5+Pq6ipN06wmVTEqAuTzec7OztqKeb1eDg0NcXh4mJ2dnba1qakpPj09fQ6AaZq24pqmcWNjw1Ygl8tR13UODg6KvPHxcRYKhY8DxONxIRoOh/n8/FxRIJ/Pc35+XuRHo9GPAeRyOSqKIp785eVFrFX6zoVCgcFgkADY1tbG+/v72gF0XScAulwubm5uOhba399nfX09AXBtbc3xvpI+cHBwAADo6OjAwMBAWeOUu9nd3Q1FUQAAiUTCsQtL+sDl5SUAwOv1oqmpCZFIBLquQ5IkAMDJyYlkmiYURYEkSSAJv9+PlZUV+Hw+pFIppNPp2gEsywIA1NXVAQCy2Szu7u4EQLFYhGVZ4h5JZLNZ2x6+Y76VALjdbgDA+fk5DMNALBZDLBarKkISlmXh9PQUACDLsmOAkjOgqioA4OzsDMlk0pGIJEk4Pj7G0dERAKC3t9cxQIkLHh8f2d7eTgAcGRnh29ubWLMsiyStcqd5YmKCANjS0sLr62vHLijbiKLRqGgsCwsLwv9/AEpiaWlJ5C8uLjouXhHAMAyOjo4K0VAoxGQyyWKxKHJM02QqleLk5KRtJgQCAabT6Y8BkOTDwwNDoZAQbmhoYE9PD8PhMKenp+n3+9nY2Fh2Qqqq6hii6jg2DIPLy8v0eDwVx7Esy4xEIrah9B4Iify3aTOZDLa2trC7uysalcfjgaZpCAaDaG1tRSaTwdjYGHZ2dsQ+VVWxvr4urO3IBR+J29tbBgKBd72JTwWoBeLTASpBaJrGi4uLrwH4C9Hf32+DmJmZ+ToAkry5uREQsixze3v7awH+QszNzTGRSJRdd2TD/xnf/mf0A/Ab7yKv9G2CQgcAAAAASUVORK5CYII=' />" +
                        "<img class='MenuItem' id='" + canvas.id + "ZoomIn' data-vectorid=\'" + canvas.id + "\' title='Zoom In' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAADFElEQVRIid2WMUjrUBSGz61taWNnAzEOVkSLIA5KkkoVQe1YBBUq1UUQXQQ3obi46iJ1ce7kIrhIcJKqqAWh6KaDKBa1olWMNKnNvW+4cLHaF198dXjvbPnvuefLufnPJYgQAj8Zjh+t/l8AnBZrhUJhf3//6Ojo+vqaECIIgiRJ3d3dPp/PBoFUCoxxMpns6Oj4nB8IBNbW1kzTrLjxc1QA6Lo+NTXFKjY1NfX39w8MDDQ3NzNxbGzs+fn5OwDTNFl1WZY3NzdZIU3TVFXt6+ujqyMjI8Vi0TYgmUzS/bFY7OXlhYrz8/Ozs7P0WHRdn5mZoTmJRMIeQNO0trY2+u6vr6+sp5aWFkEQCoUCVYrFYjgcBoCGhoaHhwcbAFVVAcDhcGxtbb3X29vb/X6/YRhMOTg4cLlcALC+vm4NKJuDw8NDAPD7/b29ve91hBD1G1M6Oztpr6lUytqlZXNwdXVFbcNxXDweV1WVlj4/PzdNMxgMIoQIIYqirK6uBgKBTCaTzWZtADDGAFBTUwMA+Xz+/v6eAkqlEsaYPhJC8vk8SyNf3ZVlAEEQAODi4sIwjJWVleXlZYQQxlhRFE3Tjo+PPR4PIcTpdGKMz87OAIDneWtA2TeQJIkeSDqddrlcHMd5vd7a2lqEEELI5/N5vV6O49xu9+np6cnJCQAEg0FrQJmLnp6eGhsbAWBwcPDt7Y2KGOPW1lZRFHVdZ5mjo6MAUFdXd3NzY8OmhJBEIkHBc3NzdLIwxpOTk9FolCEXFxdpzsLCgnX1CgDDMIaGhuj+SCSSTqdLpRJdMk0zk8lEo1HWfSgUymaz9gCEkMfHx0gkQku43e6urq5YLDY+Pq4oisfj+XDCkiRZMypf14ZhLC0tiaL4+ZvxPB+Px9mV9yUDkd8bOZfLbW9v7+3t0QEURVGW5XA4XF9fn8vlhoeHd3d3GWNjY4O63MpFtuLu7i4UCn3Zx/cBf8j4K8BnhizLl5eX1QRQRk9PD2NMTExUGUAIub29pQye53d2dqoPoIzp6elUKvVBt7JpVeLf/3X8ccAvWrqEIlwHIuQAAAAASUVORK5CYII=' />" +
                        "&nbsp;" +
                        "<img class='MenuItem' style='background-color:#ffffff' id='" + canvas.id + "ShapeFill' data-vectorid=\'" + canvas.id + "\' title='Shape Fill' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAr0lEQVRYhe1X0QrAIAicY///uz26lxUsbZWZLVAIChKv064ERMRjoV0jzgCQ5tJznBrBufVUADEYIqYhBSFmIKfcPAVa5gAcgANwAOxjJNX1Ft9cMYuvoURaW3wA4LVveQoIAOv/yf8YsDZShLGKR25Cj7EMhBASHuVBagxKv+KHAW0aSLjlNWAB4PNe9wLoEYmmvVuloOVE3TK6DQPTethac8pFrSFBZl70KQqRld0cfEUhSgWQhwAAAABJRU5ErkJggg==' />" +
                        "<img class='MenuItem' style='background-color:black' id='" + canvas.id + "ShapeOutline' data-vectorid=\'" + canvas.id + "\' title='Shape Outline' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEK0lEQVRYhe2XXUxbZRjH/+d06yApbjDYCBEMCyTjS8HCosAGgS0KpbQbK1AyICaKy0LEj2TiQBOiWZRgwCt3oQxLKZQPLzeIEwzyIZBB1xY2BBZm+jEMaSilXJT2PN4AAeLgNLJx45Ocm/M+7+/9vc/7kXMYIiIcYLAHOfj/AgBwiG/i1OQkLGYL3B73rnkMw0AoFOK1+HgEBATsn8Ct72+h9949JJ05A47jnpnncrkwNDCA5lYNzqWl7Q0mnmHQ60manU1/Lyzsmnf3zh3Kk8lpdXWVF5e3ABFRXW0tlV+79sz2NbebZDlS+rmrizeTIeJ/DzhXVlBaXAJxohgRkZHbloJlBZg0GjFpNKClrQ1CoZAXk/ceAIAjPj4QiUTo6+1buP1D49C2M8QBoaEvp4S+EnZCIBDwh3qzBGqVigouKzgiivk31rx5PkGaLeHaWlt5M3nfAxazBRp1C85fOP8NgGkiEhCRz5ZHsBiyaCwuLR3RNKux8HRhfytwo/Iz+rjiwyUiOrre7+ajhw+X1Krmpenp6SUiqll/f6rs3feWv6iu5sXlJfB7fz9lXXiL042Pf7I+iH9z00/OPJmcPvqggi7J5NSiVq8Q0UsA0PdrX2VGWjoNDw//d4Flu52uKIvo27q6wY2q9fT0nMiV5HD6Bw+IiGji/jjJpbme7u7uzauvuqpquFhZRA6HY1f+nntAN6GDzWbDlaLimo13drudiOPI19cXAODj6wOO4+B2uzeP9PtXr961Wq0w6g278vc8hrFxsRCJRJieefQpEf3CMAwpFArH/NzjPyuvXz8dFR2NqckpnEtPm5JIJKvrS8T09vaWBgYFISomevcBeGwBampspIrycg8RJWz0c7lc4qYfb9fHnI7yqFWqOiKK32hzOp1J75SUeNSq5j3ZvI6hNDcXFouFHR0drSciBgCEQuF9oe+RrwMDAz2nIiJuMgyj25j98OBgw/Kyg82R5uzJ5iUQcPw4MjIy0dXecRbA5kyfPnnix3EcxsbGRFvSxZ0dnW++nZWFo8eO7Y8AAFzMu4S52VnWaDBuVmFnEBEzODDYYLVaGflFOS8ub4GTwcFITk1Fh1a7rQo74vWO9vbkjMxMBAYF7a8AACjyFTAYDOzc7Gz9zjYiYnQTuu8ez80xl/MVvJleCYSGhUGcmIh2rfYsEb1qXlxcAwCTyeRaAxLa29qSU1JSEBIS8nwEAKCgsABjo2Os2Wpt8PPzswNAXFyc46+ZmQaDXs/kKwu94nktEBEZiZjYGHRqtWllZWVvgIiTSWSpGo0mRZyUhPDw8OcrAACFSiX6+35jnU5n7aHDh90mi6lu5I8RVlmk9Jrl1SfZ1vj8RhWGhoZgNplwMjgY6enpqPnqyxcnYLPZoJuYAMsKQMQhPiEB/v7+L05gv+LAf80OXOAfN7Uiz2Y/nnwAAAAASUVORK5CYII=' />" +
                        "<img class='MenuItem' id='" + canvas.id + "LineSize' data-vectorid=\'" + canvas.id + "\' title='Line Size' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABPUlEQVRYhe1WwXKFIAzcEBjP/v93ehBj0sNreGif2qdtdabuRQYDWZJNgMzMcCLCmc4vQSD6gJnh2dibFSIqXzMr+/h8cRojcs6Pf66BudFvw8nF+cRf43QN3ATitslbeCWkVXUXAm3bwsyQUkLOGTlnqCrGcYSqgogQQtgSK6nqpqCJCKr6GNdlWNcxESHGiGEYnsZESCmBmcHMz2N/OhQR9H2/6ny+ZncfqO33lPCXPuCb1uH5zgbvoI6w425EN4HTCRQRhhDAzKXWU0qlCanqpB8Ax94M9VthUgVN04CZISLoug4isvtkS5gTv86DZA11A/FUhRAwDMPhKK1GoL4f6rz9BBYj4CKs27I7d0ECKDfjEikiKpeWqkJEXtoe0oAreg983aE+YGYlUiFMt9pKaZm7TBXct+G/JfAB75bbG0H+CW8AAAAASUVORK5CYII=' />" +
                        "<img class='MenuItem' style='background-color:black' id='" + canvas.id + "TextColor' data-vectorid=\'" + canvas.id + "\' title='Text Color' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAfUlEQVRYhe2XsQrAMAhEYymCa/7/X69DKXTQDCLYlDtwSRAfOREjADAadXQW/wTA6R2KSHmhyGkX4OGorB9dtFtAgFUPrOaD1x+peeK+AIAwIs05U3llFqhqKq+9BwhAAAIQgAAEIMCeAGaGca9g70hptRO6qv5K7mnBrwAurcU8dJh1IYQAAAAASUVORK5CYII=' />" +
                        "&nbsp;" +
                        "<img class='MenuItem' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAACRElEQVRIiWP8//8/Ay0BE01NH7VgZFjAgsxJjIvfu3s3AyMj+eb9/+/s6jJ/0SJkEQSQkZD8TzFAMwQliBgpcTsOQ1hwqYODZ8+eLZy/4PKlS0pKSpHR0do62iTZRyCSP378WJCb++H9+4ysLB4enpLCwhfPX5BkAUocyEpKwdl//vyZP3euk71DUnwCXLCksGjunDn44wDZkP///+MMohPHji9ftryxudnG1gYuyM3D8/PHD5I8gDOIfv78ycbKKicvB+G+ffNmzerVRw8fdnF1JckCnD6wtrU5eeJEalLy79+/GRkYmFlYxMTEistKVdXU4Gq+f//OysrKwoI3peAJPjzg379/UydP8fbwDA8J3bVzJx5DyLRgx7btVuYWZ06d3rBuvbuL67t378i34P37969evUIW+fz5s7uL66oVKyHcovz86VOnkmPBt2/f6qqr3Zxd/L194mJiNm/cBBGf0NcXERL669cvCPfqlSs+Hp5v3rwhzYKfP3/mZGZGhUecOXPmxfPnmzZsjI2KnjRhwp3bt63MzE+fOoWssaSwaMqkyaRZMGXipABf3+/fv8NFPn3+nJ6aaqirV1td/R8VXL92zdvDkwQL7t+/b2Npde7cWTSDPnz4UF1RCQ8NZFBbXT1rxgxMC1jQkuzSxYs1NDWXLlkiJiZmaGiElqb5+flb2tuwJnctLa2FCxZitoEY/yOJwSscJiYmFhaW379//ye61cTMzMzIyPj71y8XN1fkCoeReCPIA0O/0h+1YOAtAACq90OCjyU0lQAAAABJRU5ErkJggg==' />" +
                        "<input type='file' name='img' id='" + canvas.id + "InsertImage' data-vectorid=\'" + canvas.id + "\' title='Insert Image'  style='margin-right:-32px;position:relative;left:-34px;top:-12px;width:32px;height:32px;border:1px solid black;opacity:0'/>" +
                        "&nbsp;" +
                        "<img class='MenuItem' id='" + canvas.id + "SlideShow' data-vectorid=\'" + canvas.id + "\' title='Slide Show' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAABcUlEQVRIiWP8//8/Ay0BE01NH7Vg1IJRC4aJBSxo/Pqa2iNHDv//95+RkREqxMjAgK24+vvvn7CwcHZujpOzMz4b/qMCB1vb/6SAkIBACOPr169rVq/OysjcuWMHsgJ0H4iJiJEUAv///7939+6K5SuOHT0iKysnIiIyZ9ZsN3d3uAL0OPj3/x9JFly+fLkgL+/fv7/tnZ3TZ8309vX99/cvsgJ0HzAykRbtCooK8xctEhYWhnB//fyJiDwGBgZMH6BJEwRCQsJw07ECjCD6R1oQPX369PKlS3gUoAcRA4k16IcP7+tra/n5BfwC/F1cXNjZ2dHqYIw4IDGINNQ15i1auHvXro3r1y9ZtJiLi4uTmxvNxSjA3NiYpHwQERIKZ587e66/r+/C+QvIChjRfDR3zpxtW7b+/fuHkZGRgQHiG6gCJiYmZmYWRkbGf//+/f3758+fv3JychnZWTo6Oni8iG4B1cHQL01HLRi1gHIAANVJGg8NyBZJAAAAAElFTkSuQmCC' />" +

                        ""
                    );

    $("#" + canvas.id + "InsertImage").bind("change", function (e) {
        var vectorId = $(this).attr('data-vectorid');

        var img = new Image();
        var f = document.getElementById(canvas.id + "InsertImage").files[0];

        var reader = new window.FileReader();
        reader.readAsDataURL(f);
        reader.onloadend = function () {

            img.src = reader.result;
            img.onload = function () {
                var elm = document.getElementById(vectorId);
                var vectors = elm.ActiveBoard.shapes;
                var ctx = elm.context;

                History_AddTo(elm);

                var style = $.extend(true,{}, DrawingTools['picture'].style,
                            { src: reader.result, LineSize: elm.param.LineSize, LineColor: elm.param.LineColor.slice(0), FillColor: elm.param.FillColor.slice(0) }
                            );

                var vector = {
                    show: true,
                    type: 'picture',
                    uid: Math.floor((Math.random() * 900000000000) + 100000000000),
                    x1: 0, y1: 0, x2: img.width, y2: img.height, style: style, rotate: 0
                };

                elm.ActiveBoard.shapes.push(vector);

                ReDrawVector(vectorId);

                if ($(elm.param.history) != null) {
                    $(elm.param.history).append(
                                '<a id=\'History_' + elm.id + '_' + vector.uid + '\' ondrop="drop(event)" ondragover="allowDrop(event)" ondragstart="drag(event)" class=\'slink\' draggable="true" data-vectorid=\'' + elm.id + '\' data-id=\'' + vector.uid + '\'>' +
                                    '<div class=\'ElementDelete\' data-action=\'delete\' title=\'Delete\'></div>' +
                                    '<div class=\'ElementActive\' data-action=\'hide\' title=\'Show|Hide\' />' +
                                    '<div class=\'shapes ElementText\' data-action=\'select\'>' + vector.type + '</div>' +
                                    '</a>'
                            );

                }

            }

        }



    });


    $("#" + canvas.id + "ShapeFill").eziColor(
        {
            color: document.getElementById(canvas.id).param.FillColor,
            onColorChange: function (color) {

                var FillColor = color.split(',');

                document.getElementById(canvas.id).param.FillColor = FillColor;

                $('#' + canvas.id + "ShapeFill").css("background-color", "rgba(" + color + ")");

            }
        });

    $("#" + canvas.id + "ShapeOutline").eziColor(
        {
            color: document.getElementById(canvas.id).param.LineColor,
            onColorChange: function (color) {

                var FillColor = color.split(',');

                document.getElementById(canvas.id).param.LineColor = FillColor;

                $('#' + canvas.id + "ShapeOutline").css("background-color", "rgba(" + color + ")");

            }
        });

    $("#" + canvas.id + "TextColor").eziColor(
        {
            color: document.getElementById(canvas.id).param.TextColor,
            onColorChange: function (color) {

                var TextColor = color.split(',');

                document.getElementById(canvas.id).param.TextColor = TextColor;

                $('#' + canvas.id + "TextColor").css("background-color", "rgba(" + color + ")");

            }
        });

        $("#" + canvas.id + "ZoomIn").bind("click", function (e) {
            var vectorId = $(this).attr('data-vectorid');
            var elm = document.getElementById(vectorId);

            if (elm.param.zoom > 4)
                return;

            elm.param.zoom = elm.param.zoom + 0.25;

            var w = (elm.param.InitialWidth * elm.param.zoom) + "px"; //$(this).css("width");
            var h = (elm.param.InitialHeight * elm.param.zoom) + "px"; //$(this).css("height");

            $(".CanvasSize").css("width", w);
            $(".CanvasSize").css("height", h);

            $(".CanvasSize").attr("width", w);
            $(".CanvasSize").attr("height", h);

            $(".CanvasOverlay").css("margin-top", "-" + h);

            eziDrawHelper.ResizeContainer(elm.parentElement.parentElement);

            ReDrawVector(vectorId);
        });

        $("#" + canvas.id + "ZoomOut").bind("click", function (e) {
            var vectorId = $(this).attr('data-vectorid');
            var elm = document.getElementById(vectorId);

            if (elm.param.zoom < 0.3)
                return;

            elm.param.zoom = elm.param.zoom - 0.25;

            var w = (elm.param.InitialWidth * elm.param.zoom) + "px"; //$(this).css("width");
            var h = (elm.param.InitialHeight * elm.param.zoom) + "px"; //$(this).css("height");

            $(".CanvasSize").css("width", w);
            $(".CanvasSize").css("height", h);

            $(".CanvasSize").attr("width", w);
            $(".CanvasSize").attr("height", h);

            $(".CanvasOverlay").css("margin-top", "-" + h);

            eziDrawHelper.ResizeContainer(elm.parentElement.parentElement);

            ReDrawVector(vectorId);
        });

    $("#" + canvas.id + "LineSize").bind("click", function (e) {
        var vectorId = $(this).attr('data-vectorid');

        var LineSize = document.getElementById(vectorId).param.LineSize;

        $(document.body).eziConfirm(
                        {
                            Title: 'Line Size',
                            Height: 150,
                            CloseButton: false,
                            Desc:
                                '<div style="background-color:white;border:1px solid black">' +
                                '<input id=\'LineSize\' type="range" min="1" max="100" value="' + LineSize + '">' +
                                '</div>'
                            ,
                            Button:
                            [
                                { Title: "OK", FireFunction: function () {
                                    document.getElementById(vectorId).param.LineSize = parseInt(document.getElementById('LineSize').value);
                                }
                                },
                                { Title: "Cancle", ClassName: 'red', FireFunction: function () { } }
                            ]
                        });
    });

    $("#" + canvas.id + "Undo").bind("click", function (e) {
        var vectorId = $(this).attr('data-vectorid');
        var elm = document.getElementById(vectorId);

        History_Undo(elm);
        ReDrawVector(vectorId);
    });

    $("#" + canvas.id + "Redo").bind("click", function (e) {
        var vectorId = $(this).attr('data-vectorid');
        var elm = document.getElementById(vectorId);

        History_Redo(elm);
        ReDrawVector(vectorId);
    });

    $("#" + canvas.id + "Selector").bind("click", function (e) {
        var vectorId = $(this).attr('data-vectorid');
        var elm = document.getElementById(vectorId);

        elm.Mode = DrawingModes.Select;
        eziDrawHelper.HighlightSelectedTools(vectorId, '');
    });

    $("#" + canvas.id + "New").bind("click", function (e) {
        var vectorid = $(this).attr('data-vectorid');

        $(document.body).eziConfirm({ FireFunction: function () {
            var elm = document.getElementById(vectorid);

            elm.FileData = {
                Pages: [$.extend(true, {}, EziDrawTemplate.Blank.PageTemplate)],

                PageTemplate: $.extend(true, {}, EziDrawTemplate.Blank.PageTemplate),
                FirstPageTemplate: $.extend(true, {}, EziDrawTemplate.Blank.FirstPageTemplate),

                MasterPage: $.extend(true, {}, EziDrawTemplate.Blank.MasterTemplate),

                CurrentPage: 0,
                SelectedItem: -1,
                EditMasterPage: false
            };
            ShowHideMasterPagesToolbar(elm);
            eziDrawHelper.ChangeCurrentPage(elm, 0);

            ReDrawPages(vectorid);
            ReDrawHistory(vectorid);
            ReDrawVector(vectorid);

            History_Clear(elm);
        }
        });
    });

    $("#" + canvas.id + "Save").bind("click", function (e) {
        var vectorId = $(this).attr('data-vectorid');

        $(document.body).eziConfirm(
                        {
                            Title: 'Save',
                            Desc: 'File Name: <input id=\'FileName\'>',
                            Button:
                            [
                                { Title: "Save", FireFunction: function () {
                                    var elm = document.getElementById(vectorId);

                                    var FileName = document.getElementById('FileName').value;
                                    if (FileName.length == 0) {
                                        return;
                                    }
                                    var SavedFilesString = window.localStorage.getItem("SavedFiles");
                                    var SavedFiles = [];
                                    if (SavedFilesString != null)
                                        SavedFiles = JSON.parse(SavedFilesString);

                                    var Thumbnail = FileDateToDataUrl(elm.FileData.MasterPage.shapes, elm.FileData.Pages[0].shapes);

                                    //alert(JSON.stringify(elm.FileData.Pages));

                                    SavedFiles.push({ FileName: FileName, Thumbnail: Thumbnail, FileData: elm.FileData });

                                    window.localStorage.setItem("SavedFiles", JSON.stringify(SavedFiles));
                                }
                                },
                                { Title: "Cancle", ClassName: 'red', FireFunction: function () { } }
                            ]
                        });
    });


    $("#" + canvas.id + "Load").bind("click", function (e) {
        var x = this.getBoundingClientRect().left;
        var y = this.getBoundingClientRect().top + this.offsetHeight + 2;

        var containerW = 180;
        var containerH = $(window).height() - 90;

        var csid = this.id + "_LoadWindow";

        if ($("#" + csid).length != 0) {
            var elm = $("#" + csid);

            elm.css("width", containerW + "px");
            elm.css("height", containerH + "px");

            elm.show();
        }
        else {

            var cshtml =
                "<div " +
                    "id='" + csid + "' " +
                    "style='border:2px solid #444444;" +
                    "z-index:999;line-height:8px;padding:5px;position:absolute;" +
                    "top:" + y + "px;left:" + x + "px;width:" + containerW + "px;height:" + containerH + "px;" +
                    "overflow-x:hidden;overflow-y:scroll;box-shadow: 5px 5px 5px #888888;" +
                    "background-color:#ffffff;border-radius: 4px 4px 4px 4px;'>" +
                "</div>";

            $(document.body).append(cshtml);

            $(document).mouseup(function (e) {
                var container = $("#" + csid);

                if (!container.is(e.target) // if the target of the click isn't the container...
                            && container.has(e.target).length === 0) // ... nor a descendant of the container
                {
                    container.hide();
                }

                if (container.has(e.target).length !== 0) {
                    container.hide();
                }
            });
        }

        var vectorId = $(this).attr('data-vectorid');

        var Files = '';

        var SavedFilesString = window.localStorage.getItem("SavedFiles");
        var SavedFiles = [];
        if (SavedFilesString != null)
            SavedFiles = JSON.parse(SavedFilesString);
        else
            return;

        for (var ipos = 0; ipos < SavedFiles.length; ipos++) {
            Files +=
                "<div " +
                " onclick='LoadFile(\"" + vectorId + "\"," + ipos + ")'" +
                " style='margin:1px;padding-top:4px;border:1px solid #bbccff;background-color:#bbccff;cursor:pointer;display:inline-block;color:yellow'>" +
                "<div>" + SavedFiles[ipos].FileName + "</div>" +
                "<br/><img src='" + SavedFiles[ipos].Thumbnail + "' width=160 height:120 />" +
                "</div>";

        }

        $("#" + csid).html(Files);


    });
}