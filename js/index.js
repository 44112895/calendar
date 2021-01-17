$(function () {
    /*变量声明*/
    /*现在能找到的元素*/
    let container = $('.container');
    let show = $('#show');
    let footer = $('.footer');
    let a = container.find('h1>a');

    /*未来能找到的元素*/
    let spans = null;
    let prevYear = null;
    let prevMonth = null;
    let time = null
    let nextYear = null;
    let nextMonth = null;

    /*关于日期的变量*/
    let date = new Date();
    let year = null;
    let month = null;
    let days = null;
    let week = null;
    let prevDays = null;

    /*系统时间*/
    setInterval(function () {
        a.html(new Date().toLocaleString().replace(/[/]/g, '-'));
    }, 1000);

    /*处理日期信息*/
    function handle() {
        year = date.getFullYear();
        month = date.getMonth() + 1;
        days = new Date(year, month, 0).getDate();
        week = new Date(year, month - 1, 1).getDay();
        prevDays = new Date(year, month - 1, 0).getDate();
    }

    /*点击获取日期信息*/
    show.click(function () {
        footer.css('display', 'none');

        /*获取日期信息*/
        handle();

        /*创建<header>*/
        $('header').length === 0 && container.append(
            `<header>
                <span>上一年</span>
                <span>上一月</span>
                <span>${year}年${month}月</span>
                <span>下一月</span>
                <span>下一年</span>
            </header>`
        );

        /*变量赋值*/
        spans = container.find('span');
        prevYear = spans.eq(0);
        prevMonth = spans.eq(1);
        time = spans.eq(2);
        nextYear = spans.eq(3);
        nextMonth = spans.eq(4);

        /*<span>点击事件*/
        spans.click(function () {
            $('table').empty().remove();

            switch ($(this).index()) {
                case 0:
                    date = new Date(year - 1, month - 1);
                    break;
                case 1:
                    date = new Date(year, month - 1 - 1);
                    break;
                case 3:
                    date = new Date(year, month - 1 + 1);
                    break;
                case 4:
                    date = new Date(year + 1, month - 1);
                    break;
                default:
                    break;
            }
            handle();
            time.html(`${year}年${month}月`);
            createTable();
        });

        createTable();

        function createTable() {
            /*创建table的thead*/
            $('table').length === 0 && container.append(
                `<table>
                <thead>
                    <tr>
                        <th>日</th>
                        <th>一</th>
                        <th>二</th>
                        <th>三</th>
                        <th>四</th>
                        <th>五</th>
                        <th>六</th>
                    </tr>
                </thead>
            </table>`
            );

            /*获取table对象*/
            let table = $("table");
            let count = 1;

            if ($('tbody').length === 0) {
                let str = '<tbody>';
                /*创建tbody中的tr和td,，保存在str中*/
                for (let i = 0; i < 6; i ++) {
                    /*创建tr*/
                    str += '<tr>';
                    for (let j = 0; j < 7; j++) {
                        /*创建td*/
                        if (i ===0 && j < week) {
                            str += '<td class="others">' + (prevDays - week + 1 + j) + '</td>';
                        } else if (count <= days) {
                            str += '<td>' + count + '</td>';
                            count++;
                        } else if (count > days) {
                            str += '<td class="others">' + (count - days) + '</td>';
                            count++;
                        }
                    }
                    str += '</tr>';
                }
                str += '</tbody>';
                table.append(str);
            }

            /*获取td对象*/
            let tds = $("tbody td").not('.others');

            /*td元素的点击事件*/
            tds.click(function () {
                show.val(year + '/' + month + '/' + $(this).html());

                /*删除创建的header和table元素*/
                $("header").empty().remove();
                table.empty().remove();

                footer.css('display', 'block');
                let value = show.val().split('/');
                footer.html('您选择了：' + value[0] + '年' + value[1] + '月' + value[2] + '日');
            });
        }
    });
});