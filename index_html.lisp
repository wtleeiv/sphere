(soc:soc ("<!DOCTYPE html>"))

(soc:soc
  (:html
   (:head
    (:meta :charset "utf-8")
    (:meta :name "viewport" :content "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no")
    (:title "Sphere")
    (:link :rel "stylesheet" :href "css/style.css"))
   (:body
    (:script :src "js/three.min.js")
    ;; (:script :src "js/Detector.js")
    ;;; make own controls (pointer-lock plus movement)
    (:script :src "js/controls/TyControls.js")
    (:script :src "js/sphere.js"))))
