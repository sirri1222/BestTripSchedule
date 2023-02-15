import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Modal from "../../Layout/Modal";

const Header = () => {
  // 모달 만들기
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = (e) => {
    e.stopPropagation();
    setModalVisible(false);
  };

  // 프로필 클릭
  const [isClicked, setIsClicked] = useState(false);

  const handleCircleClick = () => {
    setIsClicked(!isClicked);
  };

  const headerRef = useRef();
  const { pathname } = useLocation();

  const handleScroll = () => {
    if (pathname === "/") {
      if (window.scrollY > 0) {
        headerRef.current.classList.add("bg-main");
      } else {
        headerRef.current.classList.remove("bg-main");
      }
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    if (pathname !== "/") {
      headerRef.current.classList.add("bg-main");
    }
    if (window.scrollY === 0 && pathname === "/") {
      headerRef.current.classList.remove("bg-main");
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);
  return (
    <header
      className="fixed top-0 w-full z-50 text-white transition-all duration-500"
      ref={headerRef}
    >
      <div className="flex items-center justify-between h-20 max-w-[1400px] mx-auto">
        <Link to="/">로고</Link>
        <button onClick={openModal}>Login</button>
        {modalVisible && (
          <Modal
            width={700}
            height={800}
            onClose={closeModal}
            visible={modalVisible}
          >
            <section className="mt-40 flex flex-col justify-center items-center">
              <h3 className="mb-12 text-[25px] font-semibold text-center">
                지금 //프로젝트명//과 <br />
                여행을 시작하세요!
              </h3>
              {/* 로그인 form */}
              <form className="flex flex-col gap-2 w-full max-w-md">
                <span className="text-gray-600">이메일</span>
                <input
                  type="email"
                  className="block px-1 py-2 text-gray-700 border-b border-gray-300"
                  placeholder="abc@gmail.com"
                  value=""
                />
                <span className="text-gray-600">비밀번호</span>
                <input
                  type="text"
                  className="block px-1 py-2 text-gray-700 border-b border-gray-300"
                  placeholder="영문,숫자,특수문자"
                  value=""
                />
                <button className="py-4 mb-12 bg-main text-white text-lg rounded mt-6">
                  로그인
                </button>
              </form>
              {/* 회원가입 */}
              <div className="flex flex-col gap-2 items-center">
                <p className="text-center text-gray-500">
                  회원이 아니세요?
                  <Link className="ml-2 font-bold text-main" to="/signUp">
                    회원가입하기
                  </Link>
                </p>
                <p className="text-gray-500">or</p>
                <p className="text-gray-500">SNS 간편 로그인</p>
                <div className="flex justify-center mt-4">
                  <img
                    className="h-20 w-20 mr-8"
                    src="/photo/kakaoicon.png"
                    alt="카카오톡"
                  />
                  <img
                    className="h-20 w-20"
                    src="/photo/googleicon.png"
                    alt="구글"
                  />
                </div>
              </div>
            </section>
          </Modal>
        )}
        {/* 임시 */}


        <div>
          <div
            className="mb-3 cursor-pointer rounded-3xl  bg-gray-400 text-center w-[50px] h-[50px]"
            onClick={handleCircleClick}
          >
            사진
            {isClicked && (
              <div className="m-6 text-black bg-white w-[100px] h-[100px]">
                <ul className="text-center">
                  <li className="py-3 hover:bg-gray-200">
                    <Link to="/mypage">마이페이지</Link>
                  </li>
                  <li className="py-3 hover:bg-gray-200">로그아웃</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
