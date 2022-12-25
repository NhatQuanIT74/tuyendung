var load = function (Url, pageIndex) {
    debugger;
    $.ajax({
        url: Url,
        data: {
            pageIndex: pageIndex,
            pageSize: 5
        },
        type: "GET",
        success: function (response) {
            var pageCurrent = response.pageCurrent;
            var toalPage = response.toalPage;

            if (response.totalRecord == 0) {
                let content = `<div>Không có bài viết</div>`
                $(".result__total--content").html(content);
                $(".result__paging--list").html(null);
                $(".result__list--search").html(null);
                return;
            }
            $(".result__total--content").html(`Tìm được <span>${response.totalRecord}</span> bài viết`);
            var str = "";
            $.each(response.data, function (index, value) {
                str += "<div class='col result__item l-12 m-6 c-12'><div class='result__item--wrapper'><div class='result__item--img'>";
                str += "<img class='full_width' src='" + value.AnhChinh + "'></div>";
                str += `<div class='result__item--name'><h2 class='result__name--title'><a href='/bai-viet/${value.TieuDe}-${value.MaBaiViet}' class='result__name--link text-line-1'>${value.TenBaiViet}</a>`;
                str += "<span class='result__name--save'><a href='' title='Lưu tin tuyển dụng'></a></span></h2>";
                str += `<div class='result__name--employer mb-5'><a href='/cong-ty/${value.TieuDeNTD}-${value.MaTacGia}' class='result__employer--link text-line-1'><span class='result__icon'>`;
                str += `<i class='far fa-building'></i></span><span>${value.TenTacGia}</span></a></div>`
                str += "<p class='result__salary mb-5'><span class='result__icon'><i class='fas fa-eye'></i></span>Lượt xem: <span>" + value.LuotXem + "</span></p>";
                str += "<div class='result__date mb-5'><p class='result__date--start mb-0'><span class='result__icon'><i class='fa-regular fa-calendar-check'></i></span>";
                str += "Ngày đăng: <span>" + value.ThoiGian + "</span></p></div>";
                str += "</div></div></div>";

                //create pagination
                var pagination_string = "";

                if (pageCurrent > 1) {
                    var pagePrevious = pageCurrent - 1;
                    pagination_string += '<li class="previous"><a href="#" data-page="' + pagePrevious + '">‹</a></li>';
                }
                for (var i = 1; i <= toalPage; i++) {
                    if (i == pageCurrent) {
                        pagination_string += '<li class="active"><a href="#" data-page=' + i + '>' + i + '</a></li>';
                    } else {
                        pagination_string += '<li class=""><a href="#" data-page=' + i + '>' + i + '</a></li>';
                    }
                }
                //create button next
                if (pageCurrent > 0 && pageCurrent < toalPage) {
                    var pageNext = pageCurrent + 1;
                    pagination_string += '<li class="next"><a href="#" data-page=' + pageNext + '>›</a></li>';
                }
                $(".result__paging--list").html(pagination_string);
            });
            //load str to class="load-list"
            $(".result__list--search").html(str);
        }
    });
}

